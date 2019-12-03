(function cars() {
  class Overlay {
    constructor(title, contentNode) {
      let element;
      // NOTE: closeOverlay() is a form of the Memento pattern
      function closeOverlay() {
        element.remove();
      }
      const template = document.createElement('template');
      template.innerHTML = `<div>
      <h1></h1>
      <span class="replaceme"></span>
      <button class="close">Close</button>
      </div>`;
      element = document.importNode(template.content, true).children[0];
      element.querySelector('h1').textContent = title;
      element.querySelector('.close').addEventListener('click', function(event) {
        closeOverlay();
        event.preventDefault();
      });
      element.replaceChild(contentNode, element.querySelector('.replaceme'));
      console.log(element);
      return element;
    }
  }
  // Set up an overlay:
  class RentalStartForm {
    constructor({ car_id }) {
      const template = document.createElement('template');
      template.innerHTML = `<form class="pure-form pure-form-stacked" action="/price" method="get">
      <input type="hidden" name="car_id" />
      <label><input type="datetime-local" name="date_start" /></label>
      <label><input type="datetime-local" name="date_end" /></label>
      <button>Get price</button>
      </form>`;
      const element = document.importNode(template.content, true);
      console.log(element);
      element.querySelector('input[name=car_id]').value = car_id;
      return element.children[0];
    }
  }

  for (let form of document.querySelectorAll('form.end_rental')) {
    form.addEventListener('submit', function(event) {
      if (!window.confirm('Are you sure you want to end the rental?')) {
        event.preventDefault();
      }
    });
  }
  for (let form of document.querySelectorAll('form.start_rental')) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const carData = new FormData(event.target);
      const car_id = carData.get('car_id');
      const overlay = new Overlay('Start rental', new RentalStartForm({ car_id }));
      document.querySelector('main').appendChild(overlay);
    });
  }
})();
