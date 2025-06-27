import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Me () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='me'>
      <Text>Hello world!</Text>
    </View>
  )
}
