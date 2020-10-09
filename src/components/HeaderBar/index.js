/* eslint-disable prettier/prettier */
import React from 'react';
import { Appbar, useTheme } from "react-native-paper";
import { Platform } from 'react-native';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const HeaderBar = ({ navigation }) => {
    const {colors} = useTheme();

    return (
    <Appbar.Header>
       <Appbar.Content title="e-Grow" color={colors.white}/>
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} color={colors.white}/>
    </Appbar.Header>
)};

export default HeaderBar;

