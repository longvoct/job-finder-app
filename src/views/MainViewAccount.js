import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../assets/colors/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import NoCVModal from '../component/modal/NoCVModal';

const MainViewAccount = ({ navigation }) => {
  const [isNoCVModal, setNoCVModal] = useState(false);
  const toggleNoCVModal = () => {
    setNoCVModal(!isNoCVModal);
  };

  const [userAuth, setUserAuth] = useState('');
  auth().onAuthStateChanged((user) => {
    if (user) {
      setUserAuth(user);
    } else setUserAuth('Unknown');
  });

  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    firestore()
      .collection('users')
      .where('id', '==', `${userAuth.uid}`)
      .onSnapshot((snapshot) => {
        let user = [];
        snapshot.forEach((doc) => {
          user.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        console.log('user: ', user[0]);
        setUserInfo(user[0]);
      });
  }, [userAuth]);

  const userDisplayArr = userAuth.displayName?.split(' ');
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
        style={{
          backgroundColor: '#fff',
          position: 'relative',
        }}
        stickyHeaderIndices={[0]}
      >
        <View
          style={{
            width: '100%',
            height: 60,
            backgroundColor: '#fff',
            elevation: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 25,
              paddingTop: 15,
              width: '100%',
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons name="ios-arrow-back-sharp" size={28} color={colors.darkGray} />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                color: colors.text,
                fontWeight: 'bold',
              }}
            >
              H??? s?? c?? nh??n
            </Text>
            <Ionicons name="settings-sharp" size={24} color={colors.text} />
          </View>
        </View>
        <View style={{ marginTop: 15, paddingHorizontal: 25 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 75,
                height: 75,
                borderRadius: 100,
                backgroundColor: '#7896FF',
              }}
            >
              <Text style={{ fontSize: 30, color: '#fff', fontWeight: '900' }}>
                {userDisplayArr && userDisplayArr[userDisplayArr?.length - 1][0]}
              </Text>
              {/* Camera */}
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: -3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 28,
                  height: 28,
                  borderRadius: 100,
                  backgroundColor: '#f9f9f9',
                  borderWidth: 1,
                  borderColor: 'white',
                }}
              >
                <FontAwesome name="camera" size={14} color={colors.text} />
              </View>
            </View>
            <View style={{ width: 60, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, color: colors.text, fontWeight: '700' }}>0</Text>
              <Text style={{ textAlign: 'center' }}>L?????t xem h??? s??</Text>
            </View>
            <View style={{ width: 70, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, color: colors.text, fontWeight: '700' }}>0</Text>
              <Text style={{ textAlign: 'center' }}>Th??ng b??o vi???c l??m</Text>
            </View>
            <View style={{ width: 70, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, color: colors.text, fontWeight: '700' }}>0</Text>
              <Text style={{ textAlign: 'center' }}>Vi???c l??m ???ng tuy???n</Text>
            </View>
          </View>
          <Text style={{ marginTop: 10, fontSize: 16, color: colors.text, fontWeight: '700' }}>
            {userAuth.displayName}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <MaterialIcons name="email" size={15} />
            <Text style={{ marginLeft: 5 }}>{userAuth?.email}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            {/* <FontAwesome name="phone" size={15} /> */}
            <AntDesign name="pluscircle" size={15} />
            <Text style={{ marginLeft: 5 }}>Th??m s??? ??i???n tho???i</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontSize: 16,
                color: colors.text,
                fontWeight: '500',
              }}
            >
              H??? s?? c???a t??i
            </Text>
            <View
              style={{
                marginTop: 20,
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                style={{
                  height: 50,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.secondary,
                  width: '48%',
                  paddingHorizontal: 15,
                }}
                onPress={() => {
                  console.log('userInfo.file: ', typeof userInfo.file);
                  if (userInfo.file !== undefined) {
                    console.log(true);
                    return navigation.navigate('PDFViewAccount', { pdfFile: userInfo.file });
                  }
                  return toggleNoCVModal();
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Xem h??? s?? hi???n t???i</Text>
              </TouchableOpacity>
              <NoCVModal handleToggleNoCVModal={toggleNoCVModal} isNoCVModal={isNoCVModal} />
              <TouchableOpacity
                style={{
                  width: '48%',
                  height: 50,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 15,
                  borderWidth: 1,
                  borderStyle: 'dashed',
                  borderColor: colors.secondary,
                }}
                onPress={() => {}}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <AntDesign name="pluscircle" size={16} color={colors.secondary} />
                  <Text style={{ marginLeft: 10, color: colors.secondary, fontWeight: 'bold' }}>
                    Upload CV m???i
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 80 }} />
      </ScrollView>
    </View>
  );
};

export default MainViewAccount;
