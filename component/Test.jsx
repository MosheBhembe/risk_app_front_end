import { useState } from 'react';
import { SafeAreaView, View, TextInput, Button, Modal } from 'react-native';


const LetsFigureOutTheProblem = () => {
    const [mainForm, setMainForm] = useState(false);
    const [nextForm, setNextForm] = useState(false);


    const nextHandler = () => {
        setMainForm(false);
        setNextForm(true);
    }

    const mainHandler = () => {
        setNextForm(false);
        setMainForm(true)
    }

    return (
        <SafeAreaView>
            <View>

            </View>
            {mainForm && (
                <View>
                    <View style={styles.checkboxContainer}>
                        <View style={styles.checkbox}>
                            <View>
                                <Text style={styles.titleText}>No loss Items</Text>
                            </View>
                            <View style={styles.optionContainer}>
                                <View style={styles.optionRowView}>
                                    <Checkbox
                                        value={checked.noLoss === 'Yes'}
                                        onValueChange={() => toggledChecks('noLoss', 'Yes')}
                                    />
                                    <Text style={styles.label}>Yes</Text>
                                </View>
                                <View style={styles.optionRowView}>
                                    <Checkbox
                                        value={checked.noLoss === "No"}
                                        onValueChange={() => toggledChecks('noLoss', 'No')}
                                    />
                                    <Text style={styles.label}>No</Text>
                                </View>
                                <View style={styles.optionRowView}>
                                    <Checkbox
                                        value={checked.noLoss === 'N/A'}
                                        onValueChange={() => toggledChecks('noLoss', 'N/A')}
                                    />
                                    <Text style={styles.label}>N/A</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.checkbox}>
                            <View>
                                <Text style={styles.titleText}>Windows are closed</Text>
                            </View>
                            <View style={styles.optionContainer}>
                                <View style={styles.optionRowView}>
                                    <Checkbox
                                        value={checked.closedWindows === "Yes"}
                                        onValueChange={() => toggledChecks('closedWindows', 'Yes')}
                                    />
                                    <Text style={styles.label}>Yes</Text>
                                </View>
                                <View style={styles.optionRowView}>
                                    <Checkbox
                                        value={checked.closedWindows === 'No'}
                                        onValueChange={() => toggledChecks('closedWindows', 'No')}
                                    />
                                    <Text style={styles.label}>No</Text>
                                </View>
                                <View style={styles.optionRowView}>
                                    <Checkbox
                                        value={checked.closedWindows === 'N/A'}
                                        onValueChange={() => toggledChecks('closedWindows', 'N/A')}
                                    />
                                    <Text style={styles.label}>N/A</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.checkbox}>
                            <View>
                                <Text style={styles.titleText}>Dashboard Warnings</Text>
                            </View>
                            <View style={styles.optionContainer}>
                                <View style={styles.optionRowView}>
                                    <Checkbox
                                        value={checked.warnings === 'Yes'}
                                        onValueChange={() => toggledChecks('warnings', 'Yes')}
                                    />
                                    <Text style={styles.label}>Yes</Text>
                                </View>
                                <View style={styles.optionRowView}>
                                    <Checkbox
                                        value={checked.warnings === 'No'}
                                        onValueChange={() => toggledChecks('warnings', 'No')}
                                    />
                                    <Text style={styles.label}>No</Text>
                                </View>

                                <View style={styles.optionRowView}>
                                    <Checkbox
                                        value={checked.warnings === "N/A"}
                                        onValueChange={() => toggledChecks('warnings', 'N/A')}
                                    />
                                    <Text style={styles.label}>N/A</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.checkbox}>
                            <View>
                                <Text style={styles.titleText}>Inside Cab is clean</Text>
                            </View>
                            <View style={styles.optionContainer}>
                                <View style={styles.optionRowView}>
                                    <Checkbox
                                        value={checked.clean === 'Yes'}
                                        onValueChange={() => toggledChecks('clean', 'Yes')}
                                    />
                                    <Text style={styles.label}>Yes</Text>
                                </View>
                                <View style={styles.optionRowView}>
                                    <Checkbox
                                        value={checked.clean === 'No'}
                                        onValueChange={() => toggledChecks('clean', 'No')}
                                    />
                                    <Text style={styles.label}>No</Text>
                                </View>
                                <View style={styles.optionRowView}>
                                    <Checkbox
                                        value={checked.clean === 'N/A'}
                                        onValueChange={() => toggledChecks('clean', 'N/A')}
                                    />
                                    <Text style={styles.label}>N/A</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.checkbox}>
                            <View>
                                <Text style={styles.titleText}>Tail Lights no Damange</Text>
                            </View>
                            <View style={styles.optionContainer}>
                                <View style={styles.optionRowView}>
                                    <Checkbox
                                        value={checked.tailLightsCondition === 'Yes'}
                                        onValueChange={() => toggledChecks('tailLightsCondition', 'Yes')}
                                    />
                                    <Text style={styles.label}>Yes</Text>
                                </View>
                                <View style={styles.optionRowView}>
                                    <Checkbox
                                        value={checked.tailLightsCondition === 'No'}
                                        onValueChange={() => toggledChecks('tailLightsCondition', 'No')}
                                    />
                                    <Text style={styles.label}>No</Text>
                                </View>
                                <View style={styles.optionRowView}>
                                    <Checkbox
                                        value={checked.tailLightsCondition === 'N/A'}
                                        onValueChange={() => toggledChecks('tailLightsCondition', 'N/A')}
                                    />
                                    <Text style={styles.label}>N/A</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.checkbox}>
                            <View>
                                <Text style={styles.titleText}>Compleled Documents</Text>
                            </View>
                            <View style={styles.optionContainer}>
                                <View style={styles.optionRowView}>
                                    <Checkbox
                                        value={checked.documents === 'Yes'}
                                        onValueChange={() => toggledChecks("documents", 'Yes')}
                                    />
                                    <Text style={styles.label}>Yes</Text>
                                </View>
                                <View style={styles.optionRowView}>
                                    <Checkbox
                                        value={checked.documents === "No"}
                                        onValueChange={() => toggledChecks('documents', 'No')}
                                    />
                                    <Text style={styles.label}>No</Text>
                                </View>
                                <View style={styles.optionRowView}>
                                    <Checkbox
                                        value={checked.documents === "N/A"}
                                        onValueChange={() => toggledChecks('documents', 'N/A')}
                                    />
                                    <Text style={styles.label}>N/A</Text>
                                </View>
                            </View>
                            <View style={styles.checkbox}>
                                <View>
                                    <Text style={styles.titleText}>Fleet and fuel cards</Text>
                                </View>
                                <View style={styles.optionContainer}>
                                    <View style={styles.optionRowView}>
                                        <Checkbox
                                            value={checked.fleet === 'Yes'}
                                            onValueChange={() => toggledChecks('fleet', 'Yes')}
                                        />
                                        <Text style={styles.label}>Yes</Text>
                                    </View>
                                    <View style={styles.optionRowView}>
                                        <Checkbox
                                            value={checked.fleet === "No"}
                                            onValueChange={() => toggledChecks('fleet', 'No')}
                                        />
                                        <Text style={styles.label}>No</Text>
                                    </View>
                                    <View style={styles.optionRowView}>
                                        <Checkbox
                                            value={checked.documents}
                                            onValueChange={() => toggledChecks('fleet', 'N/A')}
                                        />
                                        <Text style={styles.label}>N/A</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )}
            {nextForm && (
                <View>
                    <View style={styles.checkbox}>
                        <View>
                            <Text style={styles.titleText}>Parking Brakes</Text>
                        </View>
                        <View style={styles.optionContainer}>
                            <View style={styles.optionRowView}>
                                <Checkbox
                                    value={checked.parkBrakes === "Yes"}
                                    onValueChange={() => toggledChecks('parkBrakes', 'Yes')}
                                />
                                <Text style={styles.label}>Yes</Text>
                            </View>
                            <View style={styles.optionRowView}>
                                <Checkbox
                                    value={checked.parkBrakes === "No"}
                                    onValueChange={() => toggledChecks('parkBrakes', 'No')}
                                />
                                <Text style={styles.label}>No</Text>
                            </View>
                            <View style={styles.optionRowView}>
                                <Checkbox
                                    value={checked.parkBrakes === 'N/A'}
                                    onValueChange={() => toggledChecks('parkBrakes', 'N/A')}
                                />
                                <Text style={styles.label}>N/A</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.checkbox}>
                        <View>
                            <Text style={styles.titleText}>No Visual Damage</Text>
                        </View>
                        <View>
                            <View style={styles.optionContainer}>
                                <View style={styles.optionRowView}>
                                    <Checkbox
                                        value={checked.visualDamage === 'Yes'}
                                        onValueChange={() => toggledChecks('visualDamage', 'Yes')}
                                    />
                                    <Text style={styles.label}>Yes</Text>
                                </View>
                                <View style={styles.optionRowView}>
                                    <Checkbox
                                        value={checked.visualDamage === 'No'}
                                        onValueChange={() => toggledChecks('visualDamage', 'No')}
                                    />
                                    <Text style={styles.label}>No</Text>
                                </View>
                                <View style={styles.optionRowView}>
                                    <Checkbox
                                        value={checked.visualDamage === 'N/A'}
                                        onValueChange={() => toggledChecks('visualDamage', 'N/A')}
                                    />
                                    <Text style={styles.label}>N/A</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.buttonCancel} onPress={() => setShowModal(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonSubmit} onPress={() => setNext(true)}>
                                <Text style={styles.buttonText}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <View style={styles.titleView}>
                            <Text style={styles.headerTitleText}>Walk Around</Text>
                        </View>
                        <ScrollView>
                            <View style={styles.checkboxContainer}>
                                <View style={styles.checkbox}>
                                    <View>
                                        <Text style={styles.titleText}>{`Leaks (Air, Oil, Water)`}</Text>
                                    </View>
                                    <View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.leaks === "Yes"}
                                                onValueChange={() => toggledChecks('leaks', 'Yes')}
                                            />
                                            <Text style={styles.label}>Yes</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.leaks === "No"}
                                                onValueChange={() => toggledChecks('leaks', 'No')}
                                            />
                                            <Text style={styles.label}>No</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.leaks === "N/A"}
                                                onValueChange={() => toggledChecks('leaks', 'N/A')}
                                            />
                                            <Text style={styles.label}>N/A</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.checkbox}>
                                    <View>
                                        <Text style={styles.titleText}>Wheel and Nut Markers</Text>
                                    </View>
                                    <View style={styles.optionContainer}>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.wheels === 'Yes'}
                                                onValueChange={() => toggledChecks('wheels', 'Yes')}
                                            />
                                            <Text style={styles.label}>Yes</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.wheels === 'No'}
                                                onValueChange={() => toggledChecks('wheels', 'No')}
                                            />
                                            <Text style={styles.label}>No</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.wheels === 'N/A'}
                                                onValueChange={() => toggledChecks('wheels', 'N/A')}
                                            />
                                            <Text style={styles.label}>N/A</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.checkbox}>
                                    <View>
                                        <Text style={styles.titleText}>Number Plate lights</Text>
                                    </View>
                                    <View style={styles.optionContainer}>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.numberPlateLights === 'Yes'}
                                                onValueChange={() => toggledChecks('numberPlateLights', 'Yes')}
                                            />
                                            <Text style={styles.label}>Yes</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.numberPlateLights === 'No'}
                                                onValueChange={() => toggledChecks('numberPlateLights', 'No')}
                                            />
                                            <Text style={styles.label}>No</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.numberPlateLights === 'N/A'}
                                                onValueChange={() => toggledChecks('numberPlateLights', 'N/A')}
                                            />
                                            <Text style={styles.label}>N/A</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.checkbox}>
                                    <View>
                                        <Text style={styles.titleText}>Product Leaks</Text>
                                    </View>
                                    <View style={styles.optionContainer}>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.productLeaks === 'Yes'}
                                                onValueChange={() => toggledChecks('productLeaks', 'Yes')}
                                            />
                                            <Text style={styles.label}>Yes</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.productLeaks === 'No'}
                                                onValueChange={() => toggledChecks('productLeaks', 'No')}
                                            />
                                            <Text style={styles.label}>No</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.productLeaks === 'N/A'}
                                                onValueChange={() => toggledChecks('productLeaks', 'N/A')}
                                            />
                                            <Text style={styles.label}>N/A</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.checkbox}>
                                    <View>
                                        <Text style={styles.titleText}>Windscreen / Wiper plates</Text>
                                    </View>
                                    <View style={styles.optionContainer}>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.windScreen === 'Yes'}
                                                onValueChange={() => toggledChecks('windScreen', 'Yes')}
                                            />
                                            <Text style={styles.label}>Yes</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.windScreen === 'No'}
                                                onValueChange={() => toggledChecks('windScreen', 'No')}
                                            />
                                            <Text style={styles.label}>No</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.windScreen === 'N/A'}
                                                onValueChange={() => toggledChecks('windScreen', 'N/A')}
                                            />
                                            <Text style={styles.label}>N/A</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.checkbox}>
                                    <View>
                                        <Text style={styles.titleText}>Marker Lights</Text>
                                    </View>
                                    <View style={styles.optionContainer}>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.markerLights === 'Yes'}
                                                onValueChange={() => toggledChecks('markerLights', 'Yes')}
                                            />
                                            <Text style={styles.label}>Yes</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.markerLights === 'No'}
                                                onValueChange={() => toggledChecks('markerLights', 'No')}
                                            />
                                            <Text style={styles.label}>No</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.markerLights === 'N/A'}
                                                onValueChange={() => toggledChecks('markerLights', 'N/A')}
                                            />
                                            <Text style={styles.label}>N/A</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.checkbox}>
                                    <View>
                                        <Text style={styles.titleText}>Dust Covers</Text>
                                    </View>
                                    <View style={styles.optionContainer}>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.covers === 'Yes'}
                                                onValueChange={() => toggledChecks('covers', 'Yes')}
                                            />
                                            <Text style={styles.label}>Yes</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.covers === 'No'}
                                                onValueChange={() => toggledChecks('covers', 'No')}
                                            />
                                            <Text style={styles.label}>No</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.covers === 'N/A'}
                                                onValueChange={() => toggledChecks('covers', 'N/A')}
                                            />
                                            <Text style={styles.label}>N/A</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.checkbox}>
                                    <View>
                                        <Text style={styles.titleText}>Registration Plate</Text>
                                    </View>
                                    <View style={styles.optionContainer}>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.registrationPlate === 'Yes'}
                                                onValueChange={() => toggledChecks('registrationPlate', 'Yes')}
                                            />
                                            <Text style={styles.label}>Yes</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.registrationPlate === 'No'}
                                                onValueChange={() => toggledChecks('registrationPlate', 'No')}
                                            />
                                            <Text style={styles.label}>No</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.registrationPlate === 'N/A'}
                                                onValueChange={() => toggledChecks('registrationPlate', 'N/A')}
                                            />
                                            <Text style={styles.label}>N/A</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.checkbox}>
                                    <View>
                                        <Text style={styles.titleText}>Tail Lights No Damage</Text>
                                    </View>
                                    <View style={styles.optionContainer}>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.tailLightsCondition === 'Yes'}
                                                onValueChange={() => toggledChecks('tailLightsCondition', 'Yes')}
                                            />
                                            <Text style={styles.label}>Yes</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.tailLightsCondition === 'No'}
                                                onValueChange={() => toggledChecks('tailLightsCondition', 'No')}
                                            />
                                            <Text style={styles.label}>No</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.tailLightsCondition === 'N/A'}
                                                onValueChange={() => toggledChecks('tailLightsCondition', 'N/A')}
                                            />
                                            <Text style={styles.label}>N/A</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.checkbox}>
                                    <View>
                                        <Text style={styles.titleText}>Battery Cover</Text>
                                    </View>
                                    <View style={styles.optionContainer}>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.batteryCover === 'Yes'}
                                                onValueChange={() => toggledChecks('batteryCover', 'Yes')}
                                            />
                                            <Text style={styles.label}>Yes</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.batteryCover === 'No'}
                                                onValueChange={() => toggledChecks('batteryCover', 'No')}
                                            />
                                            <Text style={styles.label}>No</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.batteryCover === 'N/A'}
                                                onValueChange={() => toggledChecks('batteryCover', 'N/A')}
                                            />
                                            <Text style={styles.label}>N/A</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.checkbox}>
                                    <View>
                                        <Text style={styles.titleText}>Chevron and Pumbers</Text>
                                    </View>
                                    <View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.chevron === 'Yes'}
                                                onValueChange={() => toggledChecks('chevron', 'Yes')}
                                            />
                                            <Text style={styles.label}>Yes</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.chevron === 'No'}
                                                onValueChange={() => toggledChecks('chevron', 'No')}
                                            />
                                            <Text style={styles.label}>No</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.chevron === 'N/A'}
                                                onValueChange={() => toggledChecks('chevron', 'N/A')}
                                            />
                                            <Text style={styles.label}>N/A</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.checkbox}>
                                    <View>
                                        <Text style={styles.titleText}>Headlights No Damage</Text>
                                    </View>
                                    <View style={styles.optionContainer}>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.headLights === 'Yes'}
                                                onValueChange={() => toggledChecks("headLights", 'Yes')}
                                            />
                                            <Text style={styles.label}>Yes</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.headLights === 'No'}
                                                onValueChange={() => toggledChecks("headLights", 'No')}
                                            />
                                            <Text style={styles.label}>No</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.headLights === 'N/A'}
                                                onValueChange={() => toggledChecks("headLights", 'N/A')}
                                            />
                                            <Text style={styles.label}>N/A</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.checkbox}>
                                    <View>
                                        <Text style={styles.titleText}>Mirrors and Covers</Text>
                                    </View>
                                    <View style={styles.optionContainer}>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.mirrors === 'Yes'}
                                                onValueChange={() => toggledChecks('mirrors', 'Yes')}
                                            />
                                            <Text style={styles.label}>Yes</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.mirrors === 'No'}
                                                onValueChange={() => toggledChecks('mirrors', 'No')}
                                            />
                                            <Text style={styles.label}>No</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.mirrors === 'N/A'}
                                                onValueChange={() => toggledChecks('mirrors', 'N/A')}
                                            />
                                            <Text style={styles.label}>N/A</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.checkbox}>
                                    <View>
                                        <Text style={styles.titleText}>Reflector Tapes/ Placards</Text>
                                    </View>
                                    <View style={styles.optionContainer}>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.reflector === 'Yes'}
                                                onValueChange={() => toggledChecks('reflector', 'Yes')}
                                            />
                                            <Text style={styles.label}>Yes</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.reflector === 'No'}
                                                onValueChange={() => toggledChecks('reflector', 'No')}
                                            />
                                            <Text style={styles.label}>No</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.reflector === 'N/A'}
                                                onValueChange={() => toggledChecks('reflector', 'N/A')}
                                            />
                                            <Text style={styles.label}>N/A</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.checkbox}>
                                    <View>
                                        <Text style={styles.titleText}>Fire Extinguisher x4</Text>
                                    </View>
                                    <View style={styles.optionContainer}>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.fire === 'Yes'}
                                                onValueChange={() => toggledChecks('fire', 'Yes')}
                                            />
                                            <Text style={styles.label}>Yes</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.fire === 'No'}
                                                onValueChange={() => toggledChecks('fire', 'No')}
                                            />
                                            <Text style={styles.label}>No</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.fire === 'N/A'}
                                                onValueChange={() => toggledChecks('fire', 'N/A')}
                                            />
                                            <Text style={styles.label}>N/A</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.checkbox}>
                                    <View>
                                        <Text style={styles.titleText}>Visual New Damage</Text>
                                    </View>
                                    <View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.visualNewDamage === 'Yes'}
                                                onValueChange={() => toggledChecks('visualNewDamage', 'Yes')}
                                            />
                                            <Text style={styles.label}>Yes</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.visualNewDamage === 'No'}
                                                onValueChange={() => toggledChecks('visualNewDamage', 'Yes')}
                                            />
                                            <Text style={styles.label}>No</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.visualNewDamage === 'N/A'}
                                                onValueChange={() => toggledChecks('visualNewDamage', 'N/A')}
                                            />
                                            <Text style={styles.label}>N/A</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.checkbox}>
                                    <View>
                                        <Text style={styles.titleText}>{'Labels (Isolation, ext)'}</Text>
                                    </View>
                                    <View style={styles.optionContainer}>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.labels === 'Yes'}
                                                onValueChange={() => toggledChecks('labels', 'Yes')}
                                            />
                                            <Text style={styles.label}>Yes</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.labels === 'No'}
                                                onValueChange={() => toggledChecks('labels', 'No')}
                                            />
                                            <Text style={styles.label}>No</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.labels === 'N/A'}
                                                onValueChange={() => toggledChecks('labels', 'N/A')}
                                            />
                                            <Text style={styles.label}>N/A</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.checkbox}>
                                    <View>
                                        <Text style={styles.titleText}>Cones x6</Text>
                                    </View>
                                    <View style={styles.optionContainer}>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.cones === 'Yes'}
                                                onValueChange={() => toggledChecks('cones', 'Yes')}
                                            />
                                            <Text style={styles.label}>Yes</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.cones === 'Yes'}
                                                onValueChange={() => toggledChecks('cones', 'No')}
                                            />
                                            <Text style={styles.label}>No</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.cones === 'Yes'}
                                                onValueChange={() => toggledChecks('cones', 'N/A')}
                                            />
                                            <Text style={styles.label}>N/A</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.checkbox}>
                                    <View>
                                        <Text style={styles.titleText}>Tyres for any Damage</Text>
                                    </View>
                                    <View style={styles.optionContainer}>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.tyres === 'Yes'}
                                                onValueChange={() => toggledChecks('tyres', 'Yes')}
                                            />
                                            <Text style={styles.label}>Yes</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.tyres === 'No'}
                                                onValueChange={() => toggledChecks('tyres', 'No')}
                                            />
                                            <Text style={styles.label}>No</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.tyres === 'N/A'}
                                                onValueChange={() => toggledChecks('tyres', 'N/A')}
                                            />
                                            <Text style={styles.label}>N/A</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.checkbox}>
                                    <View>
                                        <Text style={styles.titleText}>Orange Dimond</Text>
                                    </View>
                                    <View style={styles.optionContainer}>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.orangeDimond === 'Yes'}
                                                onValueChange={() => toggledChecks('orangeDimond', 'Yes')}
                                            />
                                            <Text style={styles.label}>Yes</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.orangeDimond === 'No'}
                                                onValueChange={() => toggledChecks('orangeDimond', 'No')}
                                            />
                                            <Text style={styles.label}>Yes</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.orangeDimond === 'N/A'}
                                                onValueChange={() => toggledChecks('orangeDimond', 'N/A')}
                                            />
                                            <Text style={styles.label}>N/A</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.checkbox}>
                                    <View style={styles.optionContainer}>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.shockblocks === 'Yes'}
                                                onValueChange={() => toggledChecks('shockblocks', 'Yes')}
                                            />
                                            <Text style={styles.label}>Yes</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.shockblocks === 'No'}
                                                onValueChange={() => toggledChecks('shockblocks', 'No')}
                                            />
                                            <Text style={styles.label}>No</Text>
                                        </View>
                                        <View style={styles.optionRowView}>
                                            <Checkbox
                                                value={checked.shockblocks === 'N/A'}
                                                onValueChange={() => toggledChecks('shockblocks', 'N/A')}
                                            />
                                            <Text style={styles.label}>N/A</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.buttonSubmit} onPress={() => setSignature(true)}>
                                        <Text style={styles.buttonText}>Sign Form</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonCancel} onPress={() => setShowModal(false)}>
                                        <Text style={styles.buttonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            )}
        </SafeAreaView >
    )
}