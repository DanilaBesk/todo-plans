type Props = {
  children: React.ReactNode;
};

const ListLayout = ({ children }: Props) => {
  return (
    <div className="bg-rose-500 h-full">
      <h1>ListLayout</h1>
      {children}
    </div>
  );
};

export default ListLayout;
