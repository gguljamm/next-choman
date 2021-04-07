import * as React from 'react';
import Link from 'next/link';
import Layout from '~/components/Layout';
// import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
// import * as api from '~/src/core/api';

interface Props {
}

@observer
export default class ReviewCulture extends React.Component<Props, Props> {
  render() {
    return (
      <Layout>
        <Link href="/">고홈</Link>
      </Layout>
    );
  }
}
