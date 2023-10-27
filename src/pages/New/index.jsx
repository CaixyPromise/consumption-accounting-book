import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from "@/constants/billType"
import { useNavigate } from 'react-router-dom'
import { memo, useState } from 'react'
// import { useDate } from '@/hooks/useDate'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import { sendBillData } from "@/store/modules/bills"

const New = () => 
{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // true is 收入菜单, false is 支出菜单
    const [menuType, setMenuType] = useState(false)
    const [useFor, setUseFor] = useState('')
    const [money, setMoney] = useState(0)
    // const {date, dateText, visible, onShowDate, onHideDate, onDateChange} = useDate()
    const [dateText, setDateText] = useState(dayjs(new Date()).format("YYYY-MM-DD"));
    const [dateVisable, setDateVisable] = useState(false);
    const saveBill = () => 
    {
        const data = {
            type: menuType ? 'income' : 'pay',
            money: menuType ? money : money * -1.0,
            date: dateText,
            useFor: useFor
        }
        // console.log(data);
        dispatch(sendBillData(data))
    }

    const setDateValue = (date) => 
    {
        console.log(date);
        if (!dayjs(date).isValid()) 
        {
            console.error('Invalid date:', date);
            return;
        }
        setDateText(dayjs(date).format("YYYY-MM-DD"));
        setDateVisable(false);
    }

    return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames({ selected: !menuType })}
            onClick={() => setMenuType(false)}
          >
            支出
          </Button>
          <Button
            // 菜单类型选择，如果选择了收入，就设置为selected
            // className={classNames('selected' ? menuType : '')}
            shape="rounded"
            className={classNames({ selected: menuType })}
            onClick={() => setMenuType(true)}  // 设置为 true 表示选择了收入
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text" onClick={() => setDateVisable(true)}>{dayjs(new Date()).format('YYYY-MM-DD') === dateText ? "今天" :  dateText}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                onClose={() => setDateVisable(false)}
                onCancel={() => setDateVisable(false)}
                visible={dateVisable}
                onConfirm={(date) => setDateValue(date)}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={(e) => setMoney(e)}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[menuType ? 'income' : 'pay'].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        useFor === item.type  ? 'selected' : ''
                      )}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={() => saveBill()}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New