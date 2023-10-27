import classNames from 'classnames'
import './index.scss'
import {useMemo, useState} from 'react'
import {billTypeToName} from "@/constants/billType"
import Icon from '@/components/icon'

const DailyBill = ({date, billList}) => 
{
    const monthResult = useMemo(() => 
    {
      // 计算支出，取出type为pay的，并计算它的amout
      const pay = billList.filter(item => item.type === 'pay').reduce(
                    (acc, cur) => acc + cur.money, 0);
      const income = billList.filter(item => item.type === 'income').reduce(
                    (acc, cur) => acc + cur.money, 0);
      return {
        pay, income,
        total: pay + income
      }
    }, [billList])
    const [visible, setVisable] = useState(false)
    return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={visible ? 'arrow' : 'arrow expand'} onClick={() => setVisable(!visible)}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{monthResult.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{monthResult.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{monthResult.total.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
    {/* 单日列表 */}
    <div className="billList" style={{display : visible ? "block" : 'none'}}>
    {billList.map(item => {
        return (
        <div className="bill" key={item.id}>
            <Icon type={item.useFor}/>
            <div className="detail">
                <div className="billType">{billTypeToName[item.useFor]}</div>
            </div>
            <div className={classNames('money', item.type)}>
            {item.money.toFixed(2)}
            </div>
        </div>
        )
    })}
    </div>
    </div>
  )
}
export default DailyBill