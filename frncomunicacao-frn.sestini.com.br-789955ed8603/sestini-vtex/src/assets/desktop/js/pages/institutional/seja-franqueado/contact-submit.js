
export default {
    contactFormValidate(contact) {        
        const self = this;
        const customRules = {
            name: 'required',
            cellphone: 'required',
            email: {
                required: true,
                email: true,
            },
            location: 'required',
            message: 'required',
        };

        const customMessages = {
            name: 'Campo obrigatório.',
            cellphone: 'Campo obrigatório.',
            email: {
                required: 'Campo obrigatório',
                email: 'Por favor, informe um email válido.',
            },
            location: 'Campo obrigatório.',
            message : 'Campo obrigatório.',
        };
        
        contact.self.validate({
            ignore: ':hidden',
            rules: customRules,
            messages: customMessages,

            submitHandler(form,ev) {                
                ev.preventDefault();
                const $form = $(form);        
                
                $form
                    .addClass('is--inactive');
                const data = {
                    name: contact.inputs.nameInput.val(),
                    email: contact.inputs.emailInput.val(),
                    telephone: contact.inputs.telephoneInput.val() ? contact.inputs.telephoneInput.val() : 'Não informado',
                    cellphone: contact.inputs.cellphoneInput.val(),
                    city: contact.inputs.cityInput.val(),
                    uf: contact.inputs.ufInput.val(),
                    gender: contact.inputs.genderInput.val(),
                    birthdate: contact.inputs.birthdateInput.val(),
                    location: contact.inputs.locationInput.val(),
                    message: contact.inputs.messageInput.val(),
                };

                console.log(data);

                
                self._sendForm(contact,data);

                return false
            },
        });
    },

    backToForm(contact) {
        contact.inputs.popup.closeBtn.on('click', (ev) => {
            ev.preventDefault();

            contact.inputs.popup.self.removeClass('is--active');
            contact.inputs.popup.overlay.removeClass('is--active');
            contact.inputs.popup.body.removeClass('has--no-scroll');
            
            // contact.self
            //     .removeClass('is--inactive')
            //     .clearForm();
        });
    },

    _sendForm(contact,data) {        
        $.ajax({
            url: '/api/dataentities/SF/documents/?an=sestini',
            type: 'POST',
            accept: 'application/vnd.vtex.ds.v10+json',
            contentType: 'application/json; charset=utf-8',            
            crossDomain: true,            
            data: JSON.stringify({
                name:data.name,
                telephone:data.telephone,
                cellphone:data.cellphone,
                email: data.email, 
                city: data.city,
                uf: data.uf,
                gender: data.gender,
                birthdate: data.birthdate,
                location: data.location,
                message: data.message,
            }),
        })
        
        .done((res) => {            
            console.log('Enviado com sucesso');            
            // contact.loading.removeClass('is--active');
            contact.inputs.popup.self.addClass('is--active');
            contact.inputs.popup.errorMessage.removeClass('is--active');
            contact.inputs.popup.successMessage.addClass('is--active');
            Sestini.overlay.addClass('is--active');
            Sestini.body.addClass('has--no-scroll');
        })
        
        .fail((err) => { 
            console.log('Houve algum problema, tente novamente mais tarde');            
            // contact.loading.removeClass('is--active');
            contact.inputs.popup.self.addClass('is--active');
            contact.inputs.popup.errorMessage.addClass('is--active');
            contact.inputs.popup.successMessage.removeClass('is--active');
            Sestini.overlay.addClass('is--active');
            Sestini.body.addClass('has--no-scroll');
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
