FROM python:3.9

WORKDIR /kanastra
COPY ./versioning/requirements.txt /kanastra/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /kanastra/requirements.txt
COPY ./ /kanastra/

ENTRYPOINT ["sh", "/kanastra/entrypoint.sh"]
