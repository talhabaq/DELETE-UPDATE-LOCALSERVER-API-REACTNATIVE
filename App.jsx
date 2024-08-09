import { View, Text, StyleSheet, Button, ScrollView, Modal,TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'

const App = () => {
  const [data, setData] = useState([])
  const [showModal,setShowModal]=useState(false)
  const [selectedUser,setSelectedUser]=useState(undefined)
  const getAPIData = async () => {
    const url = "http://10.0.2.2:3000/users"
    let result = await fetch(url)
    if (result) {
      console.warn("API Fetched");
    }
    result = await result.json()
    setData(result)

  }
  const deleteApi = async (id) => {
    const url = "http://10.0.2.2:3000/users"
    const result = await fetch(`${url}/${id}`, { method: "delete" })
    if (result) {
      console.warn("Record Deleted");
      getAPIData()
    }
    result = await result.json()

  }
  const updateAPI= async (data)=>{
    const [name,setName]=useState(undefined)
    const [age,setAge]=useState(undefined)
    const [email,setEmail]=useState(undefined)
    
    useEffect(()=>{
      if(props.selectedUser){
        setName(props.selectedUser.name)
        setEmail(props.selectedUser.email)
        setAge(props.selectedUser.age.toString())
      }
 },[props.selectedUser])
      const url="http://10.0.2.2:3000/users"
      const id=props.selectedUser.id
      let result= await fetch(`${url}/${id}`,
    {
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(name,email,age)
    })
    result= await result.json()
    if(result){
      setShowModal(false)
      getAPIData() 


    }

    
    setShowModal(true)
    selectedUser(data)
  }
  useEffect(() => {getAPIData()}, [])

  return (
    <ScrollView >
      <View style={styles.main}>
        <Text style={{ fontSize: 30, flex: 0.5 }}>ID</Text>
        <Text style={{ fontSize: 30, flex: 0.8 }}>USER ID</Text>
        <Text style={{ fontSize: 25, flex: 1 }}>OPERATIONS</Text>
      </View>
      {
        data.length ?
          data.map((item) =>
            <View style={styles.main}>
              <Text style={{ fontSize: 30, flex: 1 }}>{item.id}</Text>
              <Text style={{ fontSize: 30, flex: 1 }}>{item.userId}</Text>
              <Button title='DELETE' onPress={(item) => deleteApi(item.id)} />
              <Button title='UPDATE' onPress={( )=>updateAPI(item)} />
            </View>)
          : null
      }
      <Modal visible={showModal} transparent={true}> 
      <View style={styles.centerview}>
          <View style={styles.modalView}>
            <TextInput style={styles.input} value={name} onChangeText={(text)=>setName(text)}/>
            <TextInput style={styles.input} value={email}  onChangeText={(text)=>setEmail(text)} />
            <TextInput style={styles.input} value={age} onChangeText={(text)=>setAge(text)}/>
            <Button title='update' onPress={nayaInput}/>
            <Button title="close" onPress={()=>props.setShowModal(false)}/>

          </View>
        </View>

      </Modal>
    </ScrollView>
  )
}
  
const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    justifyContent: 'center',
    backgroundColor: "orange",
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10
  },
  centerview:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  modalView:{
    padding:40,
    backgroundColor:"white",
    borderRadius:10,
    shadowColor:"black",
    elevation:5
  },
  input:{
    backgroundColor:"grey"
  }

})

export default App
