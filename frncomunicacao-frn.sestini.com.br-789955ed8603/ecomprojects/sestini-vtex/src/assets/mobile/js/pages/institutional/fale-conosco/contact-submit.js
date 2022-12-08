
export default {
    contactFormValidate(contact) {        
        const self = this;
        const customRules = {
            name: 'required',
            surname: 'required',
            address: 'required',
            number: 'required',
            zipcode: 'required',
            neighbourhood: 'required',
            city: 'required',
            state: 'required',
            cellphone: 'required',
            cpf: 'required',
            order: 'required',
            completeName: 'required',
            email: {
                required: true,
                email: true,
            },
            subject: 'required',
            message: 'required',
        };

        const customMessages = {
            name: 'Campo obrigatório.',
            surname: 'Campo obrigatório.',
            cellphone: 'Campo obrigatório.',
            address : 'Campo obrigatório.',
            number: 'Campo obrigatório.',
            neighbourhood: 'Campo obrigatório.',
            city: 'Campo obrigatório.',
            zipcode: 'Campo obrigatório.',
            state: 'Campo obrigatório.',
            cpf: 'Campo obrigatório.',
            order: 'Campo obrigatório.',
            completeName: 'Campo obrigatório.',            
            email: {
                required: 'Campo obrigatório',
                email: 'Por favor, informe um email válido.',
            },
            subject: 'Por favor, escolha uma opção.',
            message : 'Campo obrigatório.',
        };
        
        console.log(customMessages);
        
        
        contact.self.validate({
            ignore: ':hidden',
            rules: customRules,
            messages: customMessages,

            submitHandler(form,ev) {                
                ev.preventDefault();
                const $form = $(form);        
                
                // contact.messages.addClass('is--active');
                // contact.loading.addClass('is--active');
                $form
                    .addClass('is--inactive');
                const data = {
                    subject: contact.inputs.subjectInput.val(),
                    name: contact.inputs.nameInput.val(),
                    surname: contact.inputs.surnameInput.val(),
                    email: contact.inputs.emailInput.val(),
                    telephone: contact.inputs.telephoneInput.val() ? contact.inputs.telephoneInput.val() : 'Não informado',
                    cellphone: contact.inputs.cellphoneInput.val(),
                    zipcode: contact.inputs.zipcodeInput.val(),
                    address: contact.inputs.addressInput.val(),
                    number: contact.inputs.numberInput.val(),
                    complement: contact.inputs.complementInput.val(),
                    neighbourhood: contact.inputs.neighbourhoodInput.val(),
                    city: contact.inputs.cityInput.val(),
                    state: contact.inputs.stateInput.val(),
                    cpf: contact.inputs.cpfInput.val(),
                    order: contact.inputs.orderInput.val(),
                    completeName: contact.inputs.completeNameInput.val(),
                    message: contact.inputs.messageInput.val(),
                };

                console.log(data);

                
                self._sendForm(contact,data);

                return false
            },
        });
    },

    backToForm(contact) {
        // contact.error.errorBtn.on('click', (ev) => {
        //     ev.preventDefault();

            // contact.error.self.removeClass('is--active');
            // contact.messages.addClass('is--active');
        //     contact.self
        //         .removeClass('is--inactive')
        //         .clearForm();
        // });
    },

    _sendForm(contact,data) {        
        $.ajax({
            url: '/api/dataentities/FC/documents/?an=sestini',
            type: 'POST',
            accept: 'application/vnd.vtex.ds.v10+json',
            contentType: 'application/json; charset=utf-8',            
            crossDomain: true,            
            data: JSON.stringify({
                subject:data.subject,
                name:data.name,
                surname:data.surname,
                telephone:data.telephone,
                cellphone:data.cellphone,
                email: data.email, 
                zipcode: data.zipcode,
                address: data.address,
                number: data.number,
                complement: data.complement,
                neighbourhood: data.neighbourhood,
                city: data.city,
                state: data.state,
                cpf: data.cpf,
                order: data.order,
                completeName: data.completeName,
                message: data.message,
            }),
        })
        
        .done((res) => {            
            console.log('Enviado com sucesso');            
            // contact.loading.removeClass('is--active');
            contact.inputs.error.errorMessage.removeClass('is--active');
            contact.inputs.successMessage.addClass('is--active');
        })
        
        .fail((err) => { 
            console.log('Houve algum problema,tente novamente mais tarde');            
            // contact.loading.removeClass('is--active');
            contact.inputs.error.errorMessage.addClass('is--active');
        })

        .always(() => {            

            if ( Sestini.isMobile ) {
                $('html, body').animate({
                    scrollTop: contact.self.offset().top,
                }, 3000);
            }
        });

        return false;
    },
};
