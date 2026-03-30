import './globals.css';

export const metadata = {
  title: 'Momen Ayman Ramadan – Portfolio',
  description: 'Personal portfolio website of Momen Ayman Ramadan – MICT Student at AUC',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
