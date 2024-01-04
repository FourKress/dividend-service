const Core = require('@alicloud/pop-core');

const client = new Core({
  accessKeyId: 'LTAI5tBqdLF5LoKnTcDibfTu',
  accessKeySecret: 'AZMvpGsEdxk8XSsbMLmWgQOvKR50qu',
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25',
});

const params = (phoneNum, code) => {
  return {
    PhoneNumbers: phoneNum, //接收短信的手机号码
    SignName: '优税猫', //短信签名名称
    TemplateCode: 'SMS_164375188', //短信模板CODE
    TemplateParam: `{ code: '${code}' }`,
  };
};

const requestOption = {
  method: 'POST',
};

export const SendSms = async (phoneNum, code) => {
  new Promise((resolve, reject) => {
    client
      .request('SendSms', params(phoneNum, code), requestOption)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.log(err);
        reject(false);
      });
  });
};
