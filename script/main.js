const MY_API =
	"https://api.elchocrud.pro/api/v1/166333e78f85ceb3e164ec944969bd37/payments";
const table = document.querySelector("#root");

const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

document.querySelector(".form").addEventListener("submit", function (event) {
	event.preventDefault();

	let studentName = document.querySelector("#studentName").value;
	let payment = document.querySelector("#payment").value;
	let dateOfPayment = document.querySelector("#dateOfPayment").value;

	const data = {
		studentName: studentName,
		payment: payment,
		dateOfPayment: dateOfPayment,
		payed: false,
	};
	postData(data);
});

async function postData(object) {
	try {
		const response = await fetch(MY_API, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(object),
		});
		const data = await response.json();
		renderPayments(data);
	} catch (error) {
		alert("Error:" + error);
	}
}

const getPayments = async () => {
	try {
		const res = await fetch(MY_API);
		const data = await res.json();
		renderPayments(data);
	} catch (error) {
		alert("Error: " + error);
	}
};

getPayments();

function renderPayments(data) {
	let html = ``;

	data.forEach((element) => {
		html += `
    <tr>
    <td>${element.studentName}</td>
    <td>${element.payment}</td>
    <td>${element.dateOfPayment}</td>
    <td class="actions">
    <input checked="${element.payed}" onchange="tooglePayed(${element._id})" id="checkbox" type="checkbox" class="checkbox" />
    <button class="edit-button" id="editButton" onclick="updateFn(${element._id})">
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M15.8253 0.12029C15.9934 0.264266 16.0468 0.501593 15.9567 0.703697C14.4262 4.13468 11.2138 8.8743 8.86221 11.3447C8.2271 12.012 7.5461 12.4205 7.02342 12.6626C6.8178 12.7578 6.63562 12.8278 6.48879 12.878C6.47104 13.1051 6.42872 13.4159 6.32837 13.7456C6.1278 14.4046 5.66238 15.2248 4.62129 15.4851C3.54914 15.7531 2.35456 15.7535 1.54286 15.6182C1.33741 15.584 1.14579 15.5393 0.980486 15.4834C0.825714 15.4311 0.650683 15.3548 0.514566 15.2357C0.443768 15.1737 0.360124 15.0799 0.311374 14.9481C0.258196 14.8043 0.25946 14.6486 0.315022 14.5051C0.410031 14.2596 0.631426 14.1253 0.776434 14.0528C1.16948 13.8563 1.40103 13.6002 1.64331 13.2275C1.7375 13.0826 1.82731 12.9298 1.93005 12.755C1.96699 12.6921 2.0056 12.6264 2.04668 12.5572C2.19814 12.3021 2.37301 12.0176 2.59318 11.7094C3.12099 10.9705 3.7939 10.7845 4.33883 10.8132C4.46503 10.8198 4.58218 10.8377 4.68707 10.8606C4.74928 10.6888 4.82878 10.4812 4.92509 10.253C5.18619 9.63422 5.583 8.83431 6.11234 8.18428C8.28751 5.51317 12.2914 1.97796 15.2287 0.0800421C15.4146 -0.0400593 15.6573 -0.0236867 15.8253 0.12029Z" fill="white"/>
		</svg>
		
      </button>
      <button class="delete-button" id="deleteButton" onclick="deletePayment(${element._id})">
			<svg width="14" height="15" viewBox="0 0 14 15" fill="white" xmlns="http://www.w3.org/2000/svg">
			<path d="M4.5 5.5C4.77614 5.5 5 5.72386 5 6V12C5 12.2761 4.77614 12.5 4.5 12.5C4.22386 12.5 4 12.2761 4 12V6C4 5.72386 4.22386 5.5 4.5 5.5Z" fill="white"/>
			<path d="M7 5.5C7.27614 5.5 7.5 5.72386 7.5 6V12C7.5 12.2761 7.27614 12.5 7 12.5C6.72386 12.5 6.5 12.2761 6.5 12V6C6.5 5.72386 6.72386 5.5 7 5.5Z" fill="white"/>
			<path d="M10 6C10 5.72386 9.77614 5.5 9.5 5.5C9.22386 5.5 9 5.72386 9 6V12C9 12.2761 9.22386 12.5 9.5 12.5C9.77614 12.5 10 12.2761 10 12V6Z" fill="white"/>
			<path fill-rule="white" clip-rule="evenodd" d="M13.5 3C13.5 3.55228 13.0523 4 12.5 4H12V13C12 14.1046 11.1046 15 10 15H4C2.89543 15 2 14.1046 2 13V4H1.5C0.947715 4 0.5 3.55228 0.5 3V2C0.5 1.44772 0.947715 1 1.5 1H5C5 0.447715 5.44772 0 6 0H8C8.55229 0 9 0.447715 9 1H12.5C13.0523 1 13.5 1.44772 13.5 2V3ZM3.11803 4L3 4.05902V13C3 13.5523 3.44772 14 4 14H10C10.5523 14 11 13.5523 11 13V4.05902L10.882 4H3.11803ZM1.5 3V2H12.5V3H1.5Z" fill="white"/>
			</svg>
			
      </button>
    </td>
  </tr>
    `;
	});
	table.innerHTML = html;
}

const updateFn = async (id) => {
	modal.style.display = "block";
	try {
		const res = await fetch(`${MY_API}/${id}`);
		const data = await res.json();

		document.querySelector("#student").value = data.studentName;
		document.querySelector("#payment-edit").value = data.payment;
		document.querySelector("#dateOfPayment-edit").value = data.dateOfPayment;
		document
			.querySelector("#editForm")
			.addEventListener("submit", function (event) {
				event.preventDefault();
				editForm(id);
			});
	} catch (error) {
		alert("Error: " + error);
	}
};

async function editForm(id) {
	try {
		const editName = document.querySelector("#studentName-edit").value;
		const editedPayment = document.querySelector("#payment-edit").value;
		const editedData = document.querySelector("#dateOfPayment-edit").value;

		const newData = {
			studentName: editName,
			payment: editedPayment,
			dateOfPayment: editedData,
		};

		const response = await fetch(`${MY_API}/${id}`, {
			method: "POST",
			body: JSON.stringify(newData),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		renderPayments(data);
		modal.style.display = "none";
	} catch (error) {
		alert("Error: " + error);
	}
}

span.onclick = function () {
	modal.style.display = "none";
};

window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};

async function tooglePayed(id) {
	const newData = {
		payed: false,
	};
	try {
		const response = await fetch(`${MY_API}/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newData),
		});
		const data = await response.json();
		console.log(data);
		renderPayments(data);
	} catch (error) {
		alert("Error:" + error);
	}
}

async function deletePayment(id) {
	try {
		const isConfirmed = confirm("Вы уверены, что хотите удалить этот платеж?");

		if (isConfirmed) {
			const response = await fetch(`${MY_API}/${id}`, {
				method: "DELETE",
			});
			const data = await response.json();
			renderPayments(data);
		}
	} catch (error) {
		alert("Error: " + error);
	}
}
