const textEmailFrom = message => {
  const { subject, body, sender } = message.rawMessage;
  return `
              Subject: ${subject} \n
              From: ${sender.name} &lt;${sender.email}&gt; \n
              \n 
              ${body}
            `;
};

const htmlEmailFrom = message => {
  const { subject, body, sender } = message.rawMessage;

  return `
            <header>
              <h1>${subject}</h1>
              <h2>From: <a href="mailto:${sender.email}">${sender.name} 
              &lt;${sender.email}&gt;</a>
              </h2>
            </header>
            <div>${body}</div>
            `;
};

export { textEmailFrom, htmlEmailFrom };
