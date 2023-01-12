import './MainLayout.css';
export const MainLayout = (props: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <>
      <main>{props.children}</main>
    </>
  );
};
