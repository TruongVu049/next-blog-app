/* eslint-disable no-nested-ternary */
export const displayDate = (timestamp) => {
  const date = new Date(timestamp);

  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${monthNames[monthIndex]} , ${year}`;
};

export function removeHTMLTags(str) {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}

export const createUrl = (pathname, params) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

// export const displayActionMessage = (msg, status = "info") => {
//   const div = document.createElement("div");
//   const span = document.createElement("span");

//   div.className = `toast ${
//     status === "info"
//       ? "toast-info"
//       : status === "success"
//       ? "toast-success"
//       : "toast-error"
//     // eslint-disable-next-line indent
//   }`;
//   span.className = "toast-msg";
//   span.textContent = msg;
//   div.appendChild(span);

//   if (document.querySelector(".toast")) {
//     document.body.removeChild(document.querySelector(".toast"));
//     document.body.appendChild(div);
//   } else {
//     document.body.appendChild(div);
//   }

//   setTimeout(() => {
//     try {
//       document.body.removeChild(div);
//     } catch (e) {
//       console.log(e);
//     }
//   }, 3000);
// };
