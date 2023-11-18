import './globals.css';

type Props = { children: React.ReactNode };

const layout = ({ children }: Props) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};

export default layout;
