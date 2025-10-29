$(document).ready(function() {
  $.getJSON('../data/presentes.json', function(presentes) {
    const lista = $('#lista-presentes');

    // Monta os cards de presentes
    presentes.forEach(p => {
      const card = `
        <div class="bg-white shadow rounded-xl p-4 text-center hover:shadow-lg transition cursor-pointer" data-id="${p.id}">
          <img src="${p.imagem}" alt="${p.nome}" class="rounded-lg w-full h-40 object-contain mb-3">
          <h3 class="font-semibold">${p.nome}</h3>
          <p class="text-pink-600 font-bold">R$ ${p.valor}</p>
        </div>`;
      lista.append(card);
    });

    // Ao clicar em um presente
    lista.on('click', 'div[data-id]', function() {
      const id = $(this).data('id');
      const presente = presentes.find(p => p.id === id);

      $('#modalNome').text(presente.nome);
      $('#modalValor').text(presente.valor);
      $('#codigoPix').val(presente.pix);


      $('#modalPix').removeClass('hidden');
    });

    // Fecha modal
    $('#fecharModal').click(() => $('#modalPix').addClass('hidden'));

    // Copiar código Pix
    $('#copiarPix').click(function() {
      navigator.clipboard.writeText($('#codigoPix').val());
      $(this).text('Copiado! ✅');
      setTimeout(() => $(this).text('Copiar código Pix'), 2000);
    });
  });
});
