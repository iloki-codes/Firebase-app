import React, {useState} from "react";
import { StyleSheet, ScrollView, TouchableOpacity, View } from "react-native";

import{
    Container,
    Form,
    Item,
    Input,
    Text,
    Button,
    Thumbnail,
    Content
} from "native-base";

import storage from "@react-native-firebase/storage";
import ProgressBar from "react-native-progress/Bar";

import ImagePicker from "react-native-image-picker";
import { Options } from "../utils/Options";

import propTypes from "prop-types";
import { signUp } from "../action/auth";
import { connect } from "react-redux";
import { options } from "../../icon master/lcorn-master/socialApp/src/utils/options";

const SignUp = ({signUp}) => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [instaUserName, setInstaUserName] = useState('');
    const [country, setCountry] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState('.../icon master/lcorn-master/smlogo.png');
    const [imageUploading, setImageUploading] = useState(false);
    const [uploadStatus, setUploadStatus]= useState(null);
    

    const chooseImage = async () => {
        ImagePicker.showImagePicker(options, (response) => {console.log('Response = ', response)
        })

        if (response.didCancel) { console.log('User cancelled image picker');
        } else if (response.error) { console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) { console.log('User tapped custom button: ', response.customButton);
        } else { 
            console.log(response)              // or uri.data
            uploadImage(response)
         };
    }

    const uploadImage = async (response) => {
        setImageUploading(true)
        const reference = storage().ref(response.fileName)

        const task = reference.putFile(response.path)
        task.on("state_changed", (taskSnapshot) => {
            const percentage = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 1000

            setUploadStatus(percentage)
        })
        
        task.then(async () => {
            const url = await reference.getDownloadURL()

            setImage(url)
            setImageUploading(false)
        })
    }

    const doSignUp = async () => {
        signUp({name, instaUserName, bio, country, email, password})
    }

    return(
        <>
            <Text>Hi from Loki</Text>
        </>
    )
}

const mapDispatchToProps = {
    signUp: (data) => signUp(data)
}
SignUp.propTypes = {
    signUp: propTypes.func.isRequired
}
export default connect(null, mapDispatchToProps)(SignUp)