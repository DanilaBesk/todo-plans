type Props = { children: React.ReactNode };

const ClerkLayout = ({ children }: Props) => {
  return (
    <div className="h-full flex items-center justify-center mx-auto">
      {children}
    </div>
  );
};

export default ClerkLayout;
