import React from 'react';
import StoryFeed from './StoryFeed/StoryFeed';

import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header>
        <Menu></Menu>
      </Header>
      <Content>
        <StoryFeed/>
      </Content>
      <Footer></Footer>
    </Layout>
  );
}

export default App;
