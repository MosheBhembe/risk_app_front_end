import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../component/SplashScreen.js';
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
import Maintenance from '../component/Reports Components/Maintenance.js';
import SHEPolicy from '../component/SHEPolicy.js';
import SlipOptions from '../component/Slips Screens.js';
import MaintenanceSlips from '../component/Maintenance Slips.js';
import SHEAwareness from '../component/SHEAwareness.js';
import SHEAwarenessSlips from '../component/SHEAwarenessSlip.js';
import PreTripInspection from '../component/PreInspection.js';
import PostTripInspection from '../component/PostInspection.js';
import InspectionsScreen from '../component/InspectionScreen.js';
import CameraComponent from '../component/CameraComponent.js';
import LetsTestTheComponent from '../component/Test.jsx';


function StackNavigator() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>

            <Stack.Screen name="RiskBT" component={SplashScreen}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen name="login" component={Login}
                options={{
                    headerTitle: 'Sign In',
                    headerTitleAlign: 'center',
                }}
            />

            <Stack.Screen name="S.H.E Inspection" component={SHEInspectionList}
                options={{
                    headerStyle: {
                        backgroundColor: '#301934'
                    },
                    headerTintColor: "#fff",
                    headerShadowVisible: false,
                    headerTitle: ""
                }}
            />

            <Stack.Screen name='Dashboard Screen' component={DrawerNav}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen name="Maintenance Slips" component={MaintenanceSlips}
                options={{
                    headerStyle: {
                        backgroundColor: '#301934'
                    },
                    headerTintColor: "#fff",
                    headerShadowVisible: false,
                    headerTitle: ""
                }}
            />

            <Stack.Screen name='Post-Inspection' component={PostTripInspection}
                options={{
                    headerStyle: {
                        backgroundColor: '#301934'
                    },
                    headerShadowVisible: false,
                    headerTitle: "",
                    headerTintColor: '#fff'
                }}
            />

            <Stack.Screen name="S.H.E Awareness" component={SHEAwareness}
                options={{
                    headerStyle: {
                        backgroundColor: '#301934'
                    },
                    headerTintColor: '#fff',
                    headerShadowVisible: false,
                    headerTitle: "",
                    headerTintColor: '#fff'
                }}
            />
            <Stack.Screen name="S.H.E Awareness Slips" component={SHEAwarenessSlips}
                options={{
                    headerStyle: {
                        backgroundColor: '#301934'
                    },
                    headerShadowVisible: false,
                    headerTitle: "",
                    headerTintColor: '#fff'
                }}

            />

            <Stack.Screen name="Fuel" component={FuelConsumtion}
                options={{
                    headerStyle: {
                        backgroundColor: '#301934'
                    },
                    headerTintColor: "#fff",
                    headerShadowVisible: false,
                    headerTitle: ""
                }}
            />

            <Stack.Screen name='Incident Reporting' component={Report}
                options={{
                    headerStyle: {
                        backgroundColor: '#301934'
                    },
                    headerTintColor: "#fff",
                    headerShadowVisible: false,
                    headerTitle: ""
                }}
            />

            <Stack.Screen name='Pre-Inspections' component={PreTripInspection}
                options={{
                    headerStyle: {
                        backgroundColor: '#301934'
                    },
                    headerTitle: "",
                    headerShadowVisible: false,
                    headerTintColor: '#fff'
                }}
            />

            <Stack.Screen name='Inspection Screen' component={InspectionsScreen}
                options={{
                    headerStyle: {
                        backgroundColor: '#301934'
                    },
                    headerTintColor: "#f1f1f1",
                    headerTitle: "Inspections"
                }}
            />
            <Stack.Screen name="Slip Options" component={SlipOptions}
                options={{
                    headerStyle: {
                        backgroundColor: '#301934'
                    },
                    headerTintColor: "#fff",
                    headerShadowVisible: false,
                    headerTitle: 'Fleet Management'
                }}
            />
            <Stack.Screen
                name="Camera" component={CameraComponent}
                options={{
                    headerStyle: {
                        backgroundColor: '#301934'
                    },
                    headerShown: false
                }}
            />

            <Stack.Screen name="Test" component={LetsTestTheComponent} />
            <Stack.Screen name="Due Maintenance" component={Maintenance} />
            <Stack.Screen name='Registration' component={Registration} />
            <Stack.Screen name='RiskApp' component={Main} />
            <Stack.Screen name='Forgot Password' component={ForgotForm} />
            <Stack.Screen name="Sent Reports" component={SentListByReport} />
            <Stack.Screen name="S.H.E Documents" component={SHEDocumentList} />
            <Stack.Screen name="Documents" component={ExpiredDocumentsView} />
            <Stack.Screen name="Reports" component={ReportsScreen} />
            <Stack.Screen name="S.H.E Policy" component={SHEPolicy} />
        </Stack.Navigator>
    );
}

export default StackNavigator;