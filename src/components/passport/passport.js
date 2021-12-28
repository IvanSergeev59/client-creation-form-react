import React, { useState } from "react"
import Form from 'react-bootstrap/form';

const Passport = ({setPassportValid}) => {
    const [formErrors, setFormErrors] = useState({serie: false});    
    const [serie, setSerie] = useState('');
    const [number, setNumber] = useState('');
    const [issued, setIssued] = useState('');
    const [serieValid, changeSerieValid] = useState(false);
    const [numberValid, changeNumberValid] = useState(false);
    const [issuedValid, changeIssuedValid] = useState(false);
    const [issuedDateValid, changeIssuedDateValid] = useState(false);
    const [documentTypeValid, changeDocumentTypeValid ] = useState(false);
    
    const handlerUserInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        validateField(name, value);
    }

    // checking user choose typeOfDocument
    const onChangeDocumentType = () => {
        let documentTypeFields = document.getElementsByName("document");
        let count = 0;
        for (let i=0; i < documentTypeFields.length; i++) {
            documentTypeFields[i].checked ? count++ : count = count + 0
        }
        validateField('document', count);
    }

    //function validation input value
    const validateField = (fieldName, value) => {
        let newSerieValid = serieValid;
        let newNumberValid = numberValid;     
        let newIssuedValid = issuedValid ;
        let newIssuedDateValid = issuedDateValid ;
        let newDocumentTypeValid = documentTypeValid;

        switch (fieldName) {            
            case 'serie':
                setSerie(value);
                newSerieValid = value.match(/^[0-9]{4}$/);
                formErrors.serie = newSerieValid ? '' : 'Некорректно заполнено серия'; 
                break;
            case 'number':
                setNumber(value);
                newNumberValid = value.match(/^[0-9]{6}$/);
                formErrors.number = newNumberValid ? '' : 'Некорректно заполнен номер';
                break;
            case 'issued':
                setIssued(value);
                newIssuedValid = value.match(/^[0-9]{6}$/);
                formErrors.issued = newIssuedValid ? '' : 'Некорректно заполнено поле';
            break;
            case 'issued-date':
                newIssuedDateValid = value.match(/[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])/ ); 
                formErrors.issuedDate = newIssuedDateValid ? '' : 'Некорректно заполнена дата рождения'
                changeIssuedDateValid(newIssuedDateValid);
                break;
            case 'document':
                newDocumentTypeValid = value > 0;
                formErrors.documentType = newDocumentTypeValid ? '' : 'Необходимо выбрать тип документа';
                break;
            default:
                break;        
        }     
        
        changeSerieValid(newSerieValid);  
        changeNumberValid(newNumberValid);
        changeIssuedValid(newIssuedValid);
        changeDocumentTypeValid(newDocumentTypeValid);       
       
        //add errors text
        setFormErrors(formErrors);

       //checking all required validation forms and tongle disabled button       
        setPassportValid(newIssuedDateValid && newDocumentTypeValid);
    }

    // add error message to string with error
    const FormError = ({error}) => {  
        return (
            error ? <p className="formErrors">{error}</p> : null
        )
    }

    return (
        <Form className="passport">
            <Form.Group className="mb-3" >
                <Form.Label >Тип документа</Form.Label>
                {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                        onClick={onChangeDocumentType}
                        inline
                        label="Паспорт"
                        name="document"
                        type={type}
                        id={`inline-${type}-1`}
                    />
                    <Form.Check
                        inline
                        label="Свидетельство о рождении"
                        name="document"
                        type={type}
                        id={`inline-${type}-2`}
                    />
                    <Form.Check
                        inline                            
                        label="Вод.Удостоверение"
                        name="document"
                        type={type}
                        id={`inline-${type}-3`}
                    />
                    </div>
                ))}
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label htmlFor="text">Серия</Form.Label>
                <Form.Control type="text" placeholder="Серия" name="serie" value={serie} onChange={handlerUserInput}/>
                <FormError error={formErrors.serie} />             
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label htmlFor="text">Номер</Form.Label>
                <Form.Control type="text" placeholder="Номер" name="number" value={number} onChange={handlerUserInput}/>
                <FormError error={formErrors.number} />             
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label htmlFor="text">Кем выдан</Form.Label>
                <Form.Control type="text" placeholder="Кем выдан" name="issued" value={issued} onChange={handlerUserInput}/>
                <FormError error={formErrors.issued} />             
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label htmlFor="date">Дата выдачи*</Form.Label>
                <Form.Control type="date" placeholder="Дата выдачи" name="issued-date"  onChange={handlerUserInput}/>                
                <FormError error={formErrors.issuedDate} />
            </Form.Group> 
        </Form>            
    )
}

export default Passport