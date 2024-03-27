import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Image, PermissionsAndroid, Platform,Alert, Linking} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export const SettingsComponent = ({navigation}) => {

    const [profileImage, setProfileImage] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        requestCameraPermission();
        // requestGalleryPermission();
    }, []);

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'This app needs access to your camera',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                console.log('Camera Permission Result:', granted);
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Camera Permission Denied');
                    Alert.alert(
                        'Camera Permission Denied',
                        'Please grant camera permission in Settings to use this feature.',
                        [{ text: 'OK', onPress: () => Linking.openSettings()}]
                        );
                } else {
                    console.log('Camera Permission Granted');
                }
            } catch (err) {
                console.warn('Error requesting camera permission:', err);
            }
        }
    };

    const requestGalleryPermission = async () => {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.requestMultiple([
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            ], {
              title: 'Gallery Permission',
              message: 'This app needs access to your gallery',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            });
            console.log('Gallery Permission Result:', granted);
      
            if (
              granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
              granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
            ) {
              console.log('Gallery Permission Granted');
      
              // Your code to access the gallery goes here
              // For example:
              // accessGallery();
            } else {
              console.log('Gallery Permission Denied');
              Alert.alert(
                'Gallery Permission Denied',
                'Please grant gallery permission in Settings to use this feature.',
                [{ text: 'OK', onPress: () => Linking.openSettings() }]
              );
            }
          } catch (err) {
            console.warn('Error requesting gallery permission:', err);
          }
        }
      };
      

    const handleImagePick = () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 200,
            maxHeight: 200,
        };

        launchImageLibrary(options, response => {
            if (!response.didCancel) {
                setProfileImage(response?.assets[0]?.uri);
            }
        });
    };

    const handleCameraPick = () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 200,
            maxHeight: 200,
        };

        launchCamera(options, response => {
            if (!response.didCancel) {
                if (response.assets && response.assets.length > 0 && response.assets[0].uri) {
                    setProfileImage(response.assets[0].uri);
                }
            }
        });
    };

    const handleSaveProfile = () => {
        navigation.navigate('NextScreen',{name:name,phone:phone,email:email,image:profileImage});

    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ marginBottom: 20 }}>
                {profileImage && <Image source={{ uri: profileImage }} style={{ width: 200, height: 200, borderRadius: 100, margin: 10 }} />}
                <Button title="Take Picture" onPress={handleCameraPick} />
            </View>
            <TextInput
                style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 5 }}
                placeholder="Name"
                value={name}
                onChangeText={text => setName(text)}
            />
            <TextInput
                style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 5 }}
                placeholder="Phone"
                value={phone}
                onChangeText={text => setPhone(text)}
            />
            <TextInput
                style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 5 }}
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Button title="Save Profile" onPress={handleSaveProfile} />
        </View>
    );
};
