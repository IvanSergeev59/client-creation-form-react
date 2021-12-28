import React, { useState } from "react"
import Form from 'react-bootstrap/form';

const Attributes = ({setAttributesValid}) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('')
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [sex, setSex] = useState('');
    const [formErrors, setFormErrors] = useState({phone: false, name: false, clientGroup: false, birth: false, lastName: false, middleName:false,
         sex: false});
    const [phoneValid, changePhoneValid] = useState(false);
    const [nameValid, changeNameValid] = useState(false);
    const [clientGroupValid, changeClientGroupValid] = useState(false)
    const [sexValid, changeSexValid] = useState(false);
    const [birthValid, changeBirthValid] = useState(false);


    const handlerUserInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        validateField(name, value);
    }

    // function checking checkbox of client group
    const checkingValidClientGroup = () => {
        let groupClientsValid = document.getElementsByName("clientsGroup");
        let cul = 0;
        for (let i=0; i<groupClientsValid.length; i++) {
            groupClientsValid[i].checked ? cul++ : cul = cul+ 0
        }
        validateField('clientsGroup', cul)
    }   
        
    const validateField = (fieldName, value) => {        
        let newNameValid = nameValid;
        let newPhoneValid = phoneValid;
        let newMiddleName = middleName
        let newSexValid = sexValid;   
        let newBirthValid = birthValid ;
        let newClientGroupValid = clientGroupValid;
        let newLastNameValid = lastName;

        const checkingValidationNaming = (value) =>  {
            return value.match(/^[а-яА-ЯЁёa-zA-Z][а-яА-ЯёЁA-Za-z0-9-_.]{1,20}$/ )
        }      

        switch (fieldName) {            
            case 'name':
                setName(value);
                newNameValid = checkingValidationNaming(value);
                console.log(formErrors)
                formErrors.name = newNameValid ? '' : 'Некорректно заполнено имя'; 
                break;
            case 'last-name':
                setLastName(value);
                newLastNameValid = checkingValidationNaming(value);
                formErrors.lastName = newLastNameValid ? '' : 'Некорректно заполнена фамилия'; 
                break;
            case 'middle-name':
                newMiddleName = checkingValidationNaming(value);
                formErrors.middleName = newMiddleName ? '' : 'Некорректно заполнено отчество'; 
                setMiddleName(value);
                break;
            case 'birth':
                newBirthValid = value.match(/[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])/ ); 
                formErrors.birth = newBirthValid ? '' : 'Некорректно заполнена дата рождения'
                changeBirthValid(newBirthValid)              
                break;
            case 'phone':
                setPhone(value)
                newPhoneValid = value.match(/^\+?[7][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/);
                formErrors.phone = newPhoneValid ? '' : 'Некорректно заполнен телефон (должен начинаться с "7", содержать 11 цифр'
                break;
            case 'sex':
                setSex(value)
                newSexValid = value.match(/^[а-яА-ЯЁёa-zA-Z][а-яА-ЯёЁA-Za-z0-9-_.]{1,7}$/ );
                formErrors.sex = newSexValid ? '' : 'Некорректно заполнен пол'
                break;
            case 'clientsGroup':                
                newClientGroupValid = value > 0;
                formErrors.clientGroup = newClientGroupValid ? '' : 'Минимум 1 значение'
                break;
            default:
                break;        
        }
        setFormErrors(formErrors)
        changeNameValid(newNameValid);
        changePhoneValid(newPhoneValid);
        changeSexValid(newSexValid);
        changeClientGroupValid(newClientGroupValid);

        //checking all required validation forms and tongle disabled button
        setAttributesValid(newNameValid && newBirthValid && newPhoneValid && newMiddleName &&
                 newClientGroupValid);            
    }
 
    // add error message to string with error
    const FormError = ({error}) => {  
        return (
            error ? <p className="formErrors">{error}</p> : null
        )
    }

    return (
        <Form className="attributes">
            <Form.Group className="mb-3" >
                <Form.Label htmlFor="text">Имя*</Form.Label>
                <Form.Control type="text" placeholder="Имя" name="name" value={name} onChange={handlerUserInput}/>
                <FormError error={formErrors.name} />             
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label htmlFor="text">Фамилия*</Form.Label>
                <Form.Control type="text" placeholder="Фамилия" name="last-name" value={lastName} onChange={handlerUserInput}/>                
                <FormError error={formErrors.lastName} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label htmlFor="text">Отчество*</Form.Label>
                <Form.Control type="text" placeholder="Отчество" name="middle-name"  value={middleName} onChange={handlerUserInput}/>                
                <FormError error={formErrors.middleName} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label htmlFor="date">Дата рождения*</Form.Label>
                <Form.Control type="date" placeholder="Дата рождения" name="birth"  onChange={handlerUserInput}/>                
                <FormError error={formErrors.birth} />
            </Form.Group>         
            <Form.Group className="mb-3" >
                <Form.Label htmlFor="text">Номер телефона*</Form.Label>
                <Form.Control type="text" placeholder="Номер телефона" name="phone"  value={phone} onChange={handlerUserInput}/>                
                <FormError error={formErrors.phone} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label htmlFor="text">Пол</Form.Label>
                <Form.Control type="text" placeholder="Пол" name="sex"  value={sex} onChange={handlerUserInput}/>                
                <FormError error={formErrors.sex} />
            </Form.Group>            
            <Form.Group className="mb-3" >
                <Form.Label >Группа клиентов*</Form.Label>
                {['checkbox'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                    onClick={checkingValidClientGroup}
                        name="clientsGroup"
                        inline
                        label="VIP"
                        type={type}
                        id={`inline-${type}-1`}
                    />
                    <Form.Check
                        inline
                        onClick={checkingValidClientGroup}
                        label="Проблемные"
                        name="clientsGroup"
                        type={type}
                        id={`inline-${type}-2`}
                    />
                    <Form.Check
                        name="clientsGroup"
                        onClick={checkingValidClientGroup}
                        inline                            
                        label="ОМС"
                        type={type}
                        id={`inline-${type}-3`}
                    />
                    </div>
                ))}
            <FormError error={formErrors.clientGroup} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label >Лечащий врач</Form.Label>
                {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                        inline
                        label="Иванов"
                        name="doctor"
                        type={type}
                        id={`inline-${type}-1`}
                    />
                    <Form.Check
                        inline
                        label="Захаров"
                        name="doctor"
                        type={type}
                        id={`inline-${type}-2`}
                    />
                    <Form.Check
                        inline                            
                        label="Чернышева"
                        name="doctor"
                        type={type}
                        id={`inline-${type}-3`}
                    />
                    </div>
                ))}
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Check type="checkbox" label="Не отправлять СМС" />
            </Form.Group>
                      
        </Form>
    )
}

export default Attributes