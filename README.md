This is the frontend project 'Scholarnetics' powered by [Next.js](https://nextjs.org/).

## Environment Variables
Create a .env.local file in the root directory of the project.

Then, add the following env variables
```
NEXT_PUBLIC_SERVER_BASE_URL=http://localhost:<SERVER_PORT_NUMBER>
```

Replace <SERVER_PORT_NUMBER> with the port number on which the [scholarnetics-api](https://github.com/scholarnetics/scholarnetics-api) server is running. Example:
```
NEXT_PUBLIC_SERVER_BASE_URL=http://localhost:8000
```

## Running the local development server

You can run the development server using:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
