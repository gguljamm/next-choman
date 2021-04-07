import * as React from 'react';
import Link from 'next/link';
import Layout from '~/components/Layout';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import * as api from '~/src/core/api';

interface Props {
  daily:any[]
}

@observer
export default class Daily extends React.Component<Props, Props> {
  model: AboutModel;

  constructor(props: Props | Readonly<Props>) {
    super(props)
    this.model = new AboutModel(this.props.daily);
  }

  static async getInitialProps() {
    const daily = await api.getDaily()
    return {
      daily,
    }
  }

  render() {
    return (
      <Layout>
        <Link href="/">고홈</Link>
        {Object.entries(this.model.daily).map(([id, contents]) =>
          <div key={id}>
            <div>{ contents.date }</div>
            <div>{ contents.content }</div>
          </div>
        )}
      </Layout>
    );
  }
}

class AboutModel {
  @observable daily:object = {};
  @observable inputValue:string = '';
  @observable saving:boolean = false;
  @observable orderAsc:boolean = true;
  @observable limit:number = 10000;

  unsubscribe = null;

  constructor(daily: object) {
    this.daily = daily;
    this.updateWatch()
  }

  updateWatch() {
    this.unsubscribe && this.unsubscribe();
    this.unsubscribe = api.watchDaily((daily: object) => {
      this.daily = daily;
    }, this.limit, this.orderAsc)
  }

  @action async add(value: string) {
    this.inputValue = ''
    this.saving = true;
    await api.addTodo(value)
    this.saving = false;
  }

  @action delete(docId: string) {
    api.deleteTodo(docId)
  }

  @action toggleOrder() {
    this.orderAsc = !this.orderAsc;
    this.updateWatch();
  }

  @action setLimit(limit: string) {
    this.limit = parseInt(limit);
    this.updateWatch();
  }
}
