# A contact responder

The contact responder ...

    Should
        recieve a ContactRequest


    Should
        validate the ContactRequest


    Should
        create a ContactResponse 
            setting the type to email
            setting the subject, provided by the ContactRequest.subject
            setting the body, provided by the ContactRequest.body
            setting the from address, provided by the ContactRequest.ContactSender.email
            setting the from name, provided by the ContactRequest.ContactSender.name


    Should
        send the email
