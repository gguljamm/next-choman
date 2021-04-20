import * as React from 'react';
import Link from 'next/link';
import Layout from '~/components/Layout';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import * as api from '~/src/core/api';
import obj from '~/public/jammggul-export.json';
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry';

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

  onClickEvent() {
    console.log(obj.daily);
  }

  render() {
    return (
      <Layout>
        <Link href="/">고홈</Link><br/>
        <div className={'masonryWrap'}>
          <ResponsiveMasonry
            columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
          >
            <Masonry>
              {Object.entries(this.model.daily).map(([id, contents]) =>
                <div key={id} className={'block'}>
                  <div>
                    { contents.imgUrl.map((v:string, i:number) => <img alt={ v } key={ i } src={ v } />) }
                    <div>{ contents.date }</div>
                    <div dangerouslySetInnerHTML={{ __html: contents.content.replace(/\n/g, '<br/>') }}></div>
                  </div>
                </div>
              )}
            </Masonry>
          </ResponsiveMasonry>
        </div>
        <button onClick={() => this.onClickEvent()}>백업해볼까</button>
        <style jsx>{`
          .masonryWrap{
            padding: 10px 10px 0;
            .block{
              > div{
                margin: 0 10px 10px;
                padding: 10px;
                border: 1px solid #eee;
                > img{
                  width: 100%;
                }
              }
            }
          }
        `}</style>
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

  componentDidMount() {
    this.updateWatch();
  }

  updateWatch() {
    api.watchDaily((daily: object) => {
      this.daily = daily;
    }, this.limit)
  }

  @action async add(docName: string, key:string, value: any) {
    this.inputValue = ''
    this.saving = true;
    await api.addDoc(docName, key, value)
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
