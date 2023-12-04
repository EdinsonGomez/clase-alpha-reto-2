const textToArray = (textResult = "") => {
  const listData = textResult
    .split("\n")
    .map((row) => row.split("#"))
    .map((row) =>
      row.map((v) => {
        let value = v.trim();

        if (isNaN(v)) {
          return value;
        }

        return +value;
      })
    );

  return listData;
};

const textToDocs = (textResult) => {
  const listData = textToArray(textResult);
  
  const data = listData
    .map((row, idx) => {
      const doc = {};

      row.forEach((v) => {
        if (typeof v === 'string') {
          doc.name = v;
          return;
        }
      
        if (typeof v === 'number' && v === idx + 1) {
          doc.order = v;
          return
        }
      
        if (typeof v === 'number' && Number.isInteger(v) && v !== idx + 1) {
          doc.id = v;
          return;
        }
      
        if (typeof v === 'number' && !Number.isInteger(v) && v !== idx + 1) {
          doc.average = v;
          return;
        }
      })

      return doc;
    })
    .filter((doc) => doc.id);

  return data;
};

export const proccessTxt = async (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject({ message: "File not provided" });
    }

    const reader = new FileReader();

    reader.onerror = (e) => {
      const message = `Error reading file:  ${file.name ?? ""}`;
      reject({ message });
    };

    reader.onload = (e) => {
      const docs = textToDocs(e.target.result);
      resolve(docs);
    };

    reader.readAsText(file);
  });
};
