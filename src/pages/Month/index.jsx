import { NavBar, DatePicker } from 'antd-mobile'
import { useState } from 'react'
import * as dataLoader  from "lodash"
import { useSelector } from 'react-redux';
import { useMemo, useEffect } from "react";
import dayjs from 'dayjs';
import './index.scss'
import DailyBill from './components';
const Month = () => 
{
  // 日期选择器
  const [dateVisable, setDateVisable] = useState(false);
  // 当前日期
  const [currentDate, setCurrentDate] = useState(() => dayjs(new Date()).format('YYYY-MM'));
  const [currentMonthList, setCurrenMonthList] = useState([])
  const billList = useSelector(state => state.bill.billsList);
  const groupMonthList = useMemo(() => 
  {
    return dataLoader.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"))
  }, [billList])



  
  const monthResult = useMemo(() => 
  {
    // 计算支出，取出type为pay的，并计算它的amout
    const pay = currentMonthList.filter(item => item.type === 'pay').reduce(
                  (acc, cur) => acc + cur.money, 0);
    const income = currentMonthList.filter(item => item.type === 'income').reduce(
                  (acc, cur) => acc + cur.money, 0);
    return {
      pay, income,
      total: pay + income
    }
  }, [currentMonthList])

  const onConfirm = (date) => 
  {
    setDateVisable(false)
    const formatedDate = dayjs(date).format('YYYY-MM');
    setCurrenMonthList(groupMonthList[formatedDate]);
    setCurrentDate(formatedDate);
  }

  useEffect(() => 
  {
    const formatedDate = dayjs(new Date()).format('YYYY-MM');
    setCurrentDate(formatedDate);
    if (groupMonthList[formatedDate]) 
    {
        setCurrenMonthList(groupMonthList[formatedDate]);
    } 
    else 
    {
        setCurrenMonthList([]);
    }
  }, [groupMonthList]); 


  const groupDayList = useMemo(() => 
  {
     console.log("currentMonthList: ", currentMonthList);
     const data = dataLoader.groupBy(currentMonthList, (item) => dayjs(item.date).format("YYYY-MM-DD"));
     const keys = Object.keys(data);
     return {
        dataKey : keys,
        dataValue : data
     }
  }, [currentMonthList])
  console.log("groupDayList: ", groupDayList)

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisable(true)}>
            <span className="text">
              {currentDate+ " "}账单
            </span>
            <span className={dateVisable ? 'arrow' : 'arrow expand'}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{monthResult.pay}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            onCancel={() => setDateVisable(false)}
            onConfirm={(date) => onConfirm(date)}
            onClose={() => setDateVisable(false)}
            visible={dateVisable}
            max={new Date()}
          />
        </div>
        {/* 单日列表统计 */}
        {
          groupDayList.dataKey.map((key) => {
              return <DailyBill key={key} date={key} billList={groupDayList.dataValue[key]}/>
          })
        }

      </div>
    </div >
  )
}

export default Month