const QRCode = require('qrcode');
const JSZip = require('jszip');
const { PassThrough } = require('stream');

const qrTeste = async () => {
  try {

    const zip = new JSZip();

    const ids = [1,2];

    const promise_qr_codes = ids.map(async (id) => {

      const qrStream = new PassThrough();
      
      await QRCode.toFileStream(qrStream ,String(id), {type: 'png'});

      zip.file(`${id}.png`, qrStream, {base64: true});
      
    });

    await Promise.all(promise_qr_codes);
    
    const content = await zip.generateAsync({type: "nodebuffer"});

    console.log('content to upload', content);
    
  } catch (error) {
    console.log(error);
  }
}
qrTeste();