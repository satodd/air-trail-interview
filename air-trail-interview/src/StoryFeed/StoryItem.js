import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
    key: 'created_at',
  },
  {
    title: 'Url',
    dataIndex: 'url',
    key: 'url',
  },
  {
    title: 'Number of Comments',
    dataIndex: 'num_comments',
    key: 'num_comments',
  },
];


class StoryItem extends React.Component {
  render() {
    return ( 
      <Table rowKey={story => story.created_at_i} pagination={false} dataSource={this.props.storyFeed} columns={columns} />
    )
  }
};

export default StoryItem;