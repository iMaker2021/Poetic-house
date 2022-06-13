import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, Text, FlatList,TouchableOpacity } from 'react-native'
import { getAllCoupons } from '@services/Database'
import styles from './styles'


const MyCoupons = () => {
    const user = useSelector((state) => state.user.user)
    const [couponsList, setCouponsList] = useState([]) //优惠券列表
    useEffect(() => {
        getAllCoupons().then(msg => {
            let arr = []
            if(msg._snapshot.value[user.id].coupons){
                for(const i of msg._snapshot.value[user.id].coupons){
                    let boo = true
                    console.log(11,i)
                    if(i.used_by){
                        for(const j of i.used_by){
                            console.log(user.id,j)
                            if(user.id == j){
                                console.log(user.id,j,'用户id')
                                boo = false 
                                break
                            }
                        }
                    }
                    console.log(22)
                    if(boo){
                        arr.push(i)
                    }
                }
            }
            setCouponsList([...arr])
        })
        
    }, [])

    const couponItem = ({item}) => {
        console.log(item,'item')
        return <View style={styles.coupon}>
            <View style={{width:'100%' }}>
                <View style={styles.couponsContainer}>
                    <Text style={styles.couponsSum}>{item.amount}</Text>
                    <View>
                        <Text style={{ ...styles.couponsTip, marginBottom: 5 }}>优惠券</Text>
                        <Text style={styles.couponsTip}>{'0.00' === item.minimum_amount ? '无门槛' : `满${item.minimum_amount}可用`}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.codeText}>
                    <Text style={{fontSize: 15, color: "#fff"}}>兑换码：</Text>
                    <Text style={{ fontSize: 15, color: "#fff",  }}>{item.code}</Text>
                </TouchableOpacity>
            </View>

        </View>
    }

    console.log(couponsList,'couponsList')
    return <View style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Text style={{margin:20,fontSize:20,fontWeight:'900'}}>我的优惠券</Text>
        <FlatList
            data={couponsList}
            keyExtractor={(item) => item.id}
            renderItem={couponItem}
        ></FlatList>
    </View>
}

export default MyCoupons