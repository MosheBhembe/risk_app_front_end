import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Report from '../component/Report';
import FuelConsumtion from '../component/fuelConsumption';
import Registration from '../component/Registration';
import Login from '../component/login';
import ForgotForm from '../component/Forgot';
import SentListByReport from '../component/sentData';
import Main from '../component/IncidentReportPage';
import DrawerNav from './DrawerNav';
import SHEInspectionList from '../component/Inspection.js';
import SHEDocumentList from '../component/SHEDocs.js';
import ExpiredDocumentsView from '../component/Reports Components/Documents.js'
import ReportsScreen from '../component/ReportsScreen.js';

function StackNavigator() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="login" component={Login}
                options={{
                    headerTitle: 'Sign In',
                    headerTitleAlign: 'center'
                }}
            />
            <Stack.Screen name='Dashboard Screen' component={DrawerNav}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='Registration' component={Registration} />
            <Stack.Screen name='RiskApp' component={Main} />
            <Stack.Screen name='Report' component={Report} />
            <Stack.Screen name="Fuel" component={FuelConsumtion} />
            <Stack.Screen name='Forgot Password' component={ForgotForm} />
            <Stack.Screen name="Sent Reports" component={SentListByReport} />
            <Stack.Screen name="S.H.E Inspection" component={SHEInspectionList} />
            <Stack.Screen name="S.H.E Documents" component={SHEDocumentList} />
            <Stack.Screen name="Documents" component={ExpiredDocumentsView} />
            <Stack.Screen name="Reports" component={ReportsScreen} />
        </Stack.Navigator>
    );
}

export default StackNavigator;