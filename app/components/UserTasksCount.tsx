
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

const UserTasksCount = () => {
  
  return (
    <View>
      <TouchableOpacity onPress={()=> {router.push('./TasksForUserPage')}}>
        <Text className= "text-2xl font-semibold text-greenPalette-300">  Úlohy : 0 </Text>
        </TouchableOpacity>
      
    
    </View>
  )
}

export default UserTasksCount;
