# Kanastra Challenge
This project implements Kanastra's coding challenge for its hiring process. The specifications are in the PDF file in this folder, but it's basically a file submission page.

The video ```kanastra.mp4``` is a recording of the system in action. NOTE: as I was running OBS and many other things at the same time, it seems to have affected performance considerably (the frontend tests would take 7 seconds on average, in the video it took more than 20 seconds), specially when uploading the files.

## Running the application
Go to the back-end and start the container using Docker Compose as you would normally do. For instance:

```sh
sudo docker-compose up -d
```

For the front-end, access the other folder ```kanastra-challenge-boilerplate```, install the modules and run the application as oriented in the README of the cloned repo.

That is:

```sh
bun install
bun run dev
```

OR

```sh
npm i
npm run dev:node
```

### Informations
Author: Vicente Knihs Erbs
Date: May 29th 2024
Contact:
- vicenteknihs@gmail.com
- +55 (47) 99627-9577
- https://vicenteke.com (portfolio)
