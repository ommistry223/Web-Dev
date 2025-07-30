    const h3 = document.getElementById('head');
    const btn = document.getElementById('btn');

    btn.addEventListener('click', function () {
      const currentDate = new Date().toLocaleDateString(); // Formats the date nicely
      h3.textContent = `Today's date is ${currentDate}`;
    });
