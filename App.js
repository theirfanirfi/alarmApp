import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ReactNativeAN from 'react-native-alarm-notification';
import SwitchToggle from "react-native-switch-toggle";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const alarmNotifData = {
  title: "My Notification Title",
  message: "My Notification Message",
  channel: "my_channel_id",
  small_icon: "ic_launcher",

  data: { foo: "bar" },
  play_sound: true,
  loop_sound: true,
  has_button: true,
  schedule_type: 'repeat',
  repeat_interval: 'minutely',
  interval_value: 5,
};

const App = () => {
  const [selectedHours, setSelectedHours] = useState("00");
  const [selectedMinutes, setSelectedMinutes] = useState("00");
  const [ampm, setAmpm] = useState('AM');
  const days = [];
  const [on, setOn] = useState(false);
  const [alarms, setAlarms] = useState([]);

  let date = new Date();
  let exactDate = date.getDate();
  let exactMonth = date.getMonth() + 1;
  let exactYear = date.getFullYear();

  useEffect(async () => {
    const alarmss = await ReactNativeAN.getScheduledAlarms();
    // console.log(alarms);
    setAlarms(alarmss);


  }, []);

  const iOSpermission = () => {
    ReactNativeAN.checkPermissions((permissions) => {
      console.log(permissions);
    });

    // Request iOS permissions
    ReactNativeAN.requestPermissions({
      alert: true,
      badge: true,
      sound: true,
    }).then(
      (data) => {
        console.log('RnAlarmNotification.requestPermissions', data);
      },
      (data) => {
        console.log('RnAlarmNotification.requestPermissions failed', data);
      }
    );
  }

  const setAlarm = async () => {

    if (Platform.OS == "ios") {
      iOSpermission();
    }

    let hours = Number(selectedHours);
    if (ampm == "PM") {
      hours = hours + 12;
    }


    const fireDate = `${exactDate}-${exactMonth}-${exactYear} ${hours}:${selectedMinutes}:00`;
    const alarm = await ReactNativeAN.scheduleAlarm({ ...alarmNotifData, fire_date: fireDate });
    const alarmss = await ReactNativeAN.getScheduledAlarms();
    setAlarms(alarmss);
    alert(`The alarm has set`);
  }

  const deleteAlarm = async (id) => {
    console.log(id);
    ReactNativeAN.deleteAlarm(parseInt(id));
    const alarmss = await ReactNativeAN.getScheduledAlarms();
    setAlarms(alarmss);
  }


  return (
    <View style={{ flex: 1 }}>

      <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'center', }}>

        <Picker
          style={{ height: 40, width: 100, color: '#fff', }}

          height={12}
          // dropdownIconColor="#695BFA"
          selectedValue={selectedHours}
          onValueChange={(hours) =>
            setSelectedHours(hours)
          }
        >
          <Picker.Item style={{ color: '#fff' }} label={selectedHours} value="Hours" />
          <Picker.Item style={{ color: '#fff' }} label="1" value="1" />
          <Picker.Item style={{ color: '#695BFA' }} label="2" value="2" />
          <Picker.Item style={{ color: '#695BFA' }} label="3" value="3" />
          <Picker.Item style={{ color: '#695BFA' }} label="4" value="4" />
          <Picker.Item style={{ color: '#695BFA' }} label="5" value="5" />
          <Picker.Item style={{ color: '#695BFA' }} label="6" value="6" />
          <Picker.Item style={{ color: '#695BFA' }} label="7" value="7" />
          <Picker.Item style={{ color: '#695BFA' }} label="8" value="8" />
          <Picker.Item style={{ color: '#695BFA' }} label="9" value="9" />
          <Picker.Item style={{ color: '#695BFA' }} label="10" value="10" />
          <Picker.Item style={{ color: '#695BFA' }} label="11" value="11" />
          <Picker.Item style={{ color: '#695BFA' }} label="12" value="12" />

        </Picker>

        <Text style={{ color: '#000000', fontSize: 24, marginTop: 42, alignSelf: 'center' }}>:</Text>
        <Picker
          style={{ height: 50, width: 100, color: '#fff' }}
          selectedValue={selectedMinutes}
          onValueChange={(minutes) =>
            setSelectedMinutes(minutes)
          }
          dropdownIconColor="#695BFA"
        >
          <Picker.Item style={{ color: '#fff' }} label={selectedMinutes} value="Minutes" />
          <Picker.Item style={{ color: '#695BFA' }} label="1" value="1" />
          <Picker.Item style={{ color: '#695BFA' }} label="2" value="2" />
          <Picker.Item style={{ color: '#695BFA' }} label="3" value="3" />
          <Picker.Item style={{ color: '#695BFA' }} label="4" value="4" />
          <Picker.Item style={{ color: '#695BFA' }} label="5" value="5" />
          <Picker.Item style={{ color: '#695BFA' }} label="6" value="6" />
          <Picker.Item style={{ color: '#695BFA' }} label="7" value="7" />
          <Picker.Item style={{ color: '#695BFA' }} label="8" value="8" />
          <Picker.Item style={{ color: '#695BFA' }} label="9" value="9" />
          <Picker.Item style={{ color: '#695BFA' }} label="10" value="10" />
          <Picker.Item style={{ color: '#695BFA' }} label="11" value="11" />
          <Picker.Item style={{ color: '#695BFA' }} label="12" value="12" />
          <Picker.Item style={{ color: '#695BFA' }} label="13" value="13" />
          <Picker.Item style={{ color: '#695BFA' }} label="14" value="14" />
          <Picker.Item style={{ color: '#695BFA' }} label="15" value="15" />
          <Picker.Item style={{ color: '#695BFA' }} label="16" value="16" />
          <Picker.Item style={{ color: '#695BFA' }} label="17" value="17" />
          <Picker.Item style={{ color: '#695BFA' }} label="18" value="18" />
          <Picker.Item style={{ color: '#695BFA' }} label="19" value="19" />
          <Picker.Item style={{ color: '#695BFA' }} label="20" value="20" />
          <Picker.Item style={{ color: '#695BFA' }} label="21" value="21" />
          <Picker.Item style={{ color: '#695BFA' }} label="22" value="22" />
          <Picker.Item style={{ color: '#695BFA' }} label="23" value="23" />
          <Picker.Item style={{ color: '#695BFA' }} label="24" value="24" />
          <Picker.Item style={{ color: '#695BFA' }} label="25" value="25" />
          <Picker.Item style={{ color: '#695BFA' }} label="26" value="26" />
          <Picker.Item style={{ color: '#695BFA' }} label="27" value="27" />
          <Picker.Item style={{ color: '#695BFA' }} label="28" value="28" />
          <Picker.Item style={{ color: '#695BFA' }} label="29" value="29" />
          <Picker.Item style={{ color: '#695BFA' }} label="30" value="30" />
          <Picker.Item style={{ color: '#695BFA' }} label="31" value="31" />
          <Picker.Item style={{ color: '#695BFA' }} label="32" value="32" />
          <Picker.Item style={{ color: '#695BFA' }} label="33" value="33" />
          <Picker.Item style={{ color: '#695BFA' }} label="34" value="34" />
          <Picker.Item style={{ color: '#695BFA' }} label="35" value="35" />
          <Picker.Item style={{ color: '#695BFA' }} label="36" value="36" />
          <Picker.Item style={{ color: '#695BFA' }} label="37" value="37" />
          <Picker.Item style={{ color: '#695BFA' }} label="38" value="38" />
          <Picker.Item style={{ color: '#695BFA' }} label="49" value="49" />
          <Picker.Item style={{ color: '#695BFA' }} label="50" value="50" />
          <Picker.Item style={{ color: '#695BFA' }} label="51" value="51" />
          <Picker.Item style={{ color: '#695BFA' }} label="52" value="52" />
          <Picker.Item style={{ color: '#695BFA' }} label="53" value="53" />
          <Picker.Item style={{ color: '#695BFA' }} label="54" value="54" />
          <Picker.Item style={{ color: '#695BFA' }} label="55" value="55" />
          <Picker.Item style={{ color: '#695BFA' }} label="56" value="56" />
          <Picker.Item style={{ color: '#695BFA' }} label="57" value="57" />
          <Picker.Item style={{ color: '#695BFA' }} label="58" value="58" />
          <Picker.Item style={{ color: '#695BFA' }} label="59" value="59" />

        </Picker>

        <Picker
          style={{ height: 50, width: 110, color: '#fff' }}
          selectedValue={ampm}
          onValueChange={(time) =>
            setAmpm(time)
          }
          dropdownIconColor="#695BFA"
        >
          <Picker.Item style={{ color: '#695BFA' }} label="AM" value="AM" />
          <Picker.Item style={{ color: '#695BFA' }} label="PM" value="PM" />

        </Picker>


      </View>
      <View style={{ flex: 0.1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
          <TouchableOpacity style={{ marginRight: 15, width: 40, backgroundColor: '#695BFA', justifyContent: 'center', borderRadius: 12, }} onPress={() => days.push(0)}><Text style={{ fontSize: 20, color: "#fff", alignSelf: 'center' }}>S</Text></TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 15, width: 40, backgroundColor: '#695BFA', justifyContent: 'center', borderRadius: 12, }} onPress={() => days.push(1)}><Text style={{ fontSize: 20, color: "#fff", alignSelf: 'center' }}>M</Text></TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 15, width: 40, backgroundColor: '#695BFA', justifyContent: 'center', borderRadius: 12, }} onPress={() => days.push(2)}><Text style={{ fontSize: 20, color: "#fff", alignSelf: 'center' }}>T</Text></TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 15, width: 40, backgroundColor: '#695BFA', justifyContent: 'center', borderRadius: 12, }} onPress={() => days.push(3)}><Text style={{ fontSize: 20, color: "#fff", alignSelf: 'center' }}>W</Text></TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 15, width: 40, backgroundColor: '#695BFA', justifyContent: 'center', borderRadius: 12, }} onPress={() => days.push(4)}><Text style={{ fontSize: 20, color: "#fff", alignSelf: 'center' }}>Th</Text></TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 15, width: 40, backgroundColor: '#695BFA', justifyContent: 'center', borderRadius: 12, }} onPress={() => days.push(5)}><Text style={{ fontSize: 20, color: "#fff", alignSelf: 'center' }}>F</Text></TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 15, width: 40, backgroundColor: '#695BFA', justifyContent: 'center', borderRadius: 12, }} onPress={() => { days.push(6); }}><Text style={{ fontSize: 20, color: "#fff", alignSelf: 'center' }}>Sa</Text></TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => setAlarm()} style={styles.setAlarmBtn}>
          <Text style={styles.textBtn}>Set Alarm</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 0.5 }}>
        <FlatList
          style={{ marginTop: 12 }}
          data={alarms}
          showsVerticalScrollIndicator={true}
          renderItem={(item) => {
            let alarm = item.item;
            return (
              <View style={styles.Alarms}>
                <View style={{ width: Dimensions.get('window').width * 2 / 2, flexDirection: 'row', marginLeft: 125 }}>
                  <Text style={{ color: '#fff', fontSize: 17, marginLeft: 7 }}>Alarm will ring at {alarm.hour}:{alarm.minute}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flexDirection: 'row', marginRight: 22, marginTop: 10 }}>
                    <TouchableOpacity style={{ marginRight: 15 }} onPress={() => { setSunday('Sunday') }}><Text style={{ fontSize: 20, color: "#fff" }}>S</Text></TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 15 }} onPress={() => { setMonday('Monday') }}><Text style={{ fontSize: 20, color: "#fff" }}>M</Text></TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 15 }} onPress={() => { setTuesday('Tuesday') }}><Text style={{ fontSize: 20, color: "#fff" }}>T</Text></TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 15 }} onPress={() => { setWednesday('Wednesday') }}><Text style={{ fontSize: 20, color: "#fff" }}>W</Text></TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 15 }} onPress={() => { setThursday('Thursday') }}><Text style={{ fontSize: 20, color: "#fff" }}>Th</Text></TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 15 }} onPress={() => { setFriday('Friday') }}><Text style={{ fontSize: 20, color: "#fff" }}>F</Text></TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 15 }} onPress={() => { setSaturday('Saturday') }}><Text style={{ fontSize: 20, color: "#fff" }}>Sa</Text></TouchableOpacity>
                  </View>
                  <View style={{ marginTop: -3 }}>
                    <SwitchToggle
                      switchOn={on}
                      circleColorOff='#695BFA'
                      circleColorOn='#695BFA'
                      backgroundColorOn='#fff'
                      backgroundColorOff='#fff'
                      onPress={() => setOn(!on)}
                      containerStyle={{
                        marginTop: 16,
                        width: 50,
                        height: 25,
                        borderRadius: 15,
                        padding: 5,
                      }}
                      circleStyle={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </View>
                <TouchableOpacity onPress={() => deleteAlarm(alarm.id)} style={styles.deleteAlarm}>
                  <Icon name="delete" size={25} color="#fff" />
                </TouchableOpacity>
              </View>
            )
          }}
        />

      </View>
    </View >

  )
}

const styles = StyleSheet.create({
  alarm: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#695BFA',
    paddingBottom: 10,
    width: '90%',
    marginTop: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  alarmBody: {
    flex: 1,
    alignItems: 'center'
  },

  setAlarmBtn: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#695BFA',
    color: '#fff',
    width: 60,
    height: 25,
    borderRadius: 15,

  },
  textBtn: {
    color: '#fff',
    fontSize: 10,
    alignSelf: 'center'
  },
  Alarms: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#695BFA',
    paddingBottom: 10,
    width: '90%',
    marginTop: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginLeft: 20,
    paddingTop: 10
  },
  deleteAlarm: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10

  }
})

export default App;
