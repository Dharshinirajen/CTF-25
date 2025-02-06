import React, { useEffect, useState } from "react";
import { CenterCard, Container } from "src/components/Homepage/Registration/CenterCard";
import { Learn2CodePromotion } from "src/components/Homepage/Registration/Learn2CodePromotion";
import {
    CustomInputGroup,
} from "src/components/Other/MixComponents/InputField/CustomInputField";
import { RegistrationFormContainer } from "src/components/Homepage/Registration/Form";
import { ButtonGreen, LoadingButton } from "src/components/Other/MixComponents/Buttons/ButtonElements";
// import { FaUserCircle } from "react-icons/fa";
import { SiNamecheap } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser, userReset } from "src/features/auth/authSlice";
import { CircleSpinner } from "react-spinners-kit";
import { RouterLink } from "src/components/Tools/ToolsElements";

const Register = ({ authPopup }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        member1: "",
        member2: "",
        member3: "",
        collegeName: "",
        teamName: "",   
        teamId: "",
        password: "",
        department: "",
        year: "",
        phoneNumber: "",
    });

    const { member1, member2, member3, collegeName, teamName, teamId, password, department, year, phoneNumber } = formData;
    const { user, isUserLoading, isUserError, userMessage } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isUserError || userMessage) {
            toast(userMessage);
        }

        if (user && user._id) {
            navigate("/");
        }
        dispatch(userReset());
    }, [user, isUserError, userMessage, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmitUserData = (e) => {
        e.preventDefault();
        const userData = { member1, member2, member3, collegeName, teamName, teamId, password, department, year, phoneNumber };
        dispatch(registerUser(userData));
    };

    return (
        <Container $authPopup={authPopup}>
            <CenterCard $authPopup={authPopup}>
                {!authPopup ? (
                    <Learn2CodePromotion>
                        <div id="reg-promo-content">
                            <RouterLink to={"/"} className="brand-logo">
                                Byte Buster's Club
                            </RouterLink>
                            <h1 className="leading-title">Learn CyberSecurity</h1>
                        </div>
                    </Learn2CodePromotion>
                ) : null}
                <RegistrationFormContainer>
                    {/* <h1 className="registration-promotion-h1"></h1> */}
                    <p className="registration-promotion-p">
                        This path will prepare you to build your base strong in cybersecurity.
                    </p>
                    <div className="registration-inputfields">
                        {AddUserData({ member1, member2, member3, collegeName, teamName, teamId, password, department, year, phoneNumber, onChange, onSubmitUserData, isUserLoading })}
                    </div>
                </RegistrationFormContainer>
            </CenterCard>
        </Container>
    );
};

const AddUserData = ({ member1, member2, member3, collegeName, teamName, teamId, password, department, year, phoneNumber, onChange, onSubmitUserData, isUserLoading }) => (
    <>
        <div style={{ display: 'flex', gap: '10px' }}>
            <CustomInputGroup>
                <span>
                    <SiNamecheap />
                </span>
                <input type="text" id="member1" name="member1" value={member1} placeholder="Member 1" onChange={onChange} autoComplete="off" />
            </CustomInputGroup>
            <CustomInputGroup>
                <span>
                    <SiNamecheap />
                </span>
                <input type="text" id="member2" name="member2" value={member2} placeholder="Member 2" onChange={onChange} autoComplete="off" />
            </CustomInputGroup>
        </div>
        <CustomInputGroup>
            <span>
                <SiNamecheap />
            </span>
            <input type="text" id="member3" name="member3" value={member3} placeholder="Member 3" onChange={onChange} autoComplete="off" />
        </CustomInputGroup>
        <CustomInputGroup>
            <input type="text" id="collegeName" name="collegeName" value={collegeName} placeholder="College Name" onChange={onChange} autoComplete="off" />
        </CustomInputGroup>
        <div style={{ display: 'flex', gap: '10px' }}>
            <CustomInputGroup style={{ flex: 1 }}>
                <input type="text" id="teamName" name="teamName" value={teamName} placeholder="Team Name" onChange={onChange} autoComplete="off" />
            </CustomInputGroup>
            <CustomInputGroup style={{ flex: 1 }}>
                <input type="text" id="teamId" name="teamId" value={teamId} placeholder="Team ID" onChange={onChange} autoComplete="off" />
            </CustomInputGroup>
        </div>
        <CustomInputGroup>
            <input type="password" id="password" name="password" value={password} placeholder="Password" onChange={onChange} autoComplete="off" />
        </CustomInputGroup>
        <CustomInputGroup>
            <input type="text" id="department" name="department" value={department} placeholder="Department" onChange={onChange} autoComplete="off" />
        </CustomInputGroup>
        <CustomInputGroup>
            <input type="text" id="year" name="year" value={year} placeholder="Year" onChange={onChange} autoComplete="off" />
        </CustomInputGroup>
        <CustomInputGroup>
            <input type="text" id="phoneNumber" name="phoneNumber" value={phoneNumber} placeholder="Phone Number" onChange={onChange} autoComplete="off" />
        </CustomInputGroup>
        {!isUserLoading ? (
            <ButtonGreen width="100%" onClick={onSubmitUserData}> {/*anna inga mail valid aaguthu na db appo konjam check pannuga na onclick ku konjam paarunga na  */}
                Start Hacking
            </ButtonGreen>
        ) : (
            <LoadingButton width="100%">
                <CircleSpinner size={20} color={"#131313"} />
            </LoadingButton>
        )}
    </>
);

export default Register;
