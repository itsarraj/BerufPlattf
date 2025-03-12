export const MainLayout = (props) => {
  const { children } = props;
  return (
    <Layout className="main-layout">
      <Header>
        <AppHeader />
      </Header>
      <Content className="layout-children">
        <AppAlert />
        {children}
      </Content>
      <Footer>
        <AppFooter />
      </Footer>
    </Layout>
  );
};