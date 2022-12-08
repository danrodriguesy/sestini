export default {
  newsletterValidate(newsletter) {
    const self = this;

    newsletter.form.validate({
      ignore: ':hidden',
      rules: {
        firstName: 'required',
        email: {
          required: true,
          email: true,
        },
        isNewsletterOptIn: 'required',
      },
      messages: {
        firstName: 'Campo obrigatório',
        email: {
          required: 'Campo obrigatório',
          email: 'Informe um e-mail válido',
        },
        isNewsletterOptIn: {
          required: 'Por favor, aceite os termos',
        },
      },
      submitHandler(form) {
        const $form = $(form);
        const serializedFormFields = $form.serialize();
        const unserializedFormFields = Sestini.globalHelpers.unserialize(
          `?${serializedFormFields}`,
        );

        newsletter.loading.addClass('is--active');
        $form.add(newsletter.title).addClass('is--inactive');
        self._sendForm(unserializedFormFields, newsletter);
      },
    });
  },

  backToForm(newsletter) {
    newsletter.errorBtn.on('click', (ev) => {
      ev.preventDefault();

      newsletter.error.removeClass('is--active');
      newsletter.form
        .add(newsletter.title)
        .removeClass('is--inactive')
        .clearForm();
    });
  },

  _sendForm(fields, newsletter) {
    Sestini.vtexMasterdata
      .insertUpdateUser(fields.email, {
        firstName: fields.firstName,
        isNewsletterOptIn: true,
      })
      .then((res) => {
        newsletter.success.addClass('is--active');
        if (isMobile.any) {
          $('.x-footer-newsletter__title').hide();
        }
      })
      .fail(err => newsletter.error.addClass('is--active'))
      .always(() => {
        newsletter.loading.removeClass('is--active');

        if (
          newsletter.form.hasClass('js--footer-newsletter-form')
                    && Sestini.isMobile
        ) {
          const headerTotalHeigh = 72;
          $('html, body').animate(
            {
              scrollTop:
                                $('.x-footer-newsletter').offset().top
                                - headerTotalHeigh,
            },
            750,
          );
        }
      });

    return false;
  },
};
