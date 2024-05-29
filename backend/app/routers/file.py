from fastapi import (
    APIRouter,
    HTTPException,
    status,
    UploadFile,
)
from datetime import datetime
from json import dumps
import os
from html import escape


router = APIRouter()


@router.get("/files/")
async def list_files():
    """ Lists all files uploaded.
    Return:
    [
        {
            "filename": str,
            "size": int,                # in bytes
            "original_filename": str,   # without the timestamp
            "uploaded_at": int,         # timestamp (in ms)
        },
    ]
    """
    res = []
    for root, _, files in os.walk(os.environ['CSV_UPLOAD_FOLDER'] + '/'):
        for filename in files:
            filepath = os.path.join(root, filename)
            file_size = os.path.getsize(filepath)
            splitted_filename = filename.split('_')
            original_filename = ''.join(splitted_filename[:-1])
            original_filename += '.' + filename.split('.')[-1]
            uploaded_at = int(splitted_filename[-1].split('.')[0])
            res.append({
                "filename": filename,
                "size": file_size,
                "original_filename": original_filename,
                "uploaded_at": uploaded_at,
            })
    return res


@router.post("/files/", status_code=status.HTTP_201_CREATED)
async def upload_file(file: UploadFile):
    """Receives a CSV file and stores it at the uploads folder.
    Return:
        {
            "filename": str,        # stored filename
            "processing": float,    # processing time in seconds
            "dataLen": int,         # number of lines in the file (excluding header)
        }
    """
    if file.size == 0:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f'File is empty'
        )
    if file.size > 200 * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f'File is too large (max 200 MB)'
        )
    if file.content_type != 'text/csv':
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f'Incompatible file format, only text/csv is accepted'
        )
    start = datetime.now()

    # create a unque file name
    filename_splitted = escape(file.filename).split('.')
    file_datetime = int(datetime.now().timestamp() * 1000)
    filename = f'{"".join(filename_splitted[:-1])}_{file_datetime}.{filename_splitted[-1]}'

    with open(f'/kanastra/uploads/{filename}', 'w') as new_file:
        # get header
        line = escape(file.file.readline().decode('utf-8'))
        new_file.writelines([line])
        headers = line[:-1].split(',')

        def get_data_from_line(column: str, line: list[str]):
            # gets data according to the column on the header
            index = headers.index(column)
            if index < 0:
                raise HTTPException(
                    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                    detail=f'File is missing column "{column}"'
                )
            return line[index]

        i = 0   # keep data length count
        line = escape(file.file.readline().decode('utf-8'))
        while line:
            new_file.writelines([line])     # store data
            line = line[:-1].split(',')

            # test if file is formatted correctly
            # NOTE: to keep things not complex, we are not sanitizing the file,
            #       so commas in any field would break this endpoint. In real
            #       life we should definitely concern about stuff like this.
            if len(line) > len(headers):
                raise HTTPException(
                    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                    detail=f'Line {i + 1} badly formatted'
                )
            data = {
                col: get_data_from_line(col, line)
                for col in headers
            }

            # uncomment if you want to simulate emails being sent with prints
            # print(f"sending email to {data['name']}...")
            # print(dumps(data, indent=4), end='\n\n')

            i += 1
            line = file.file.readline().decode('utf-8')
    
    end = datetime.now()
    processing_time = (end - start).total_seconds()
    print('Processing time:', processing_time)
    return status.HTTP_201_CREATED, {
        "filename": filename,
        "dataLen": i,
        "processing": processing_time
    }
