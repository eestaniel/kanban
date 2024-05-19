'use client'
import "./reset.css";
import "./globals.css";


export default function RootLayout({children}) {
  return (
    <html lang="en">
    <head>
      <meta charSet="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Kanban</title>
      <link rel="icon" href="#"/>
    </head>
    <body>{children}</body>
    </html>
  );
}
