// hacer apnas terminar de carga el dom
document.addEventListener('DOMContentLoaded', () => {
  let inputs = document.getElementsByClassName('.groupsMatches');
  for (let input of inputs) input.value = '';
});

//crear los grupos y sus equipos
const TEAMS = {
  groupA: [
    { name: "Qatar" },
    { name: "Ecuador" },
    { name: "Senegal" },
    { name: "Países Bajos" }
  ],
  groupB: [
    { name: "Inglaterra" },
    { name: "Irán" },
    { name: "EE UU" },
    { name: "Gales" },
  ],
  groupC: [
    { name: "Argentina" },
    { name: "A. Saudita" },
    { name: "México" },
    { name: "Polonia" },
  ],
  groupD: [
    { name: "Francia" },
    { name: "Australia" },
    { name: "Dinamarca" },
    { name: "Túnez" },
  ],
  groupE: [
    { name: "España" },
    { name: "Alemania"  },
    { name: "Costa Rica" },
    { name: "Japón" },
  ],
  groupF: [
    { name: "Bélgica" },
    { name: "Canadá" },
    { name: "Marruecos" },
    { name: "Croacia" },
  ],
  groupG: [
    { name: "Brasil" },
    { name: "Serbia" },
    { name: "Suiza" },
    { name: "Camerún" },
  ],
  groupH: [
    { name: "Portugal" },
    { name: "Ghana" },
    { name: "Uruguay" },
    { name: "Corea del Sur" },
  ]
}
//definir valores predeterminados a los grupos
Object.values(TEAMS).forEach(group => {
  group.forEach(team => {
    team.pts = 0
    team.pj = 0
    team.pg = 0
    team.pe = 0
    team.pp = 0
    team.gf = 0
    team.gc = 0
    team.dif = 0
  })
})
//crea las fechas
const MATCHES = {
  groupA: [ {id : "match1A"}, {id : "match2A"}, {id : "match3A"}, {id : "match4A"}, {id : "match5A"}, {id : "match6A"} ],
  groupB: [ {id : "match1B"}, {id : "match2B"}, {id : "match3B"}, {id : "match4B"}, {id : "match5B"}, {id : "match6B"} ],
  groupC: [ {id : "match1C"}, {id : "match2C"}, {id : "match3C"}, {id : "match4C"}, {id : "match5C"}, {id : "match6C"} ],
  groupD: [ {id : "match1D"}, {id : "match2D"}, {id : "match3D"}, {id : "match4D"}, {id : "match5D"}, {id : "match6D"} ],
  groupE: [ {id : "match1E"}, {id : "match2E"}, {id : "match3E"}, {id : "match4E"}, {id : "match5E"}, {id : "match6E"} ],
  groupF: [ {id : "match1F"}, {id : "match2F"}, {id : "match3F"}, {id : "match4F"}, {id : "match5F"}, {id : "match6F"} ],
  groupG: [ {id : "match1G"}, {id : "match2G"}, {id : "match3G"}, {id : "match4G"}, {id : "match5G"}, {id : "match6G"} ],
  groupH: [ {id : "match1H"}, {id : "match2H"}, {id : "match3H"}, {id : "match4H"}, {id : "match5H"}, {id : "match6H"} ]
}

Object.values(MATCHES).forEach(group => {
  group.forEach(match =>{
    //valores predeterminados para home
    match.h = ""
    match.hpts = 0
    match.hpj = 0
    match.hpg = 0
    match.hpe = 0
    match.hpp = 0
    match.hgf = 0
    match.hgc = 0
    match.hdif = 0
    //valores predeterminados para visitor
    match.v = ""
    match.vpts = 0
    match.vpg = 0
    match.vpe = 0
    match.vpp = 0
    match.vgf = 0
    match.vgc = 0
    match.vdif = 0
    match.vpj = 0
  })
})

const TABLES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',]

//crea los octavos de final
function playoffs(event){
  event.preventDefault()
  for (let i = 0; i < TABLES.length; i++) {
    const table = document.getElementById(`${TABLES[i]}`)
    const PJ = table.getElementsByClassName('pj')
    console.log(PJ)
    for (let td of PJ) {
      if (td.textContent != 3) {
        alert("Faltan Completar Datos de Partidos")
        return;
      }
    }
    alerta('Todavia no termine esta parte:/')
  }
}

//ordenar y completar la tabla
function sortTable(tableId, groupTeams){

  const sortedGroup = groupTeams.sort((a, b)=> {
  if (a.pts === b.pts){
    return a.dif > b.dif ? -1 : 1
  } else {
    return a.pts > b.pts ? -1 : 1
  }
  })
  console.log(sortedGroup)
  const table = document.getElementById(`${tableId}`)
  for (let i = 0; i < sortedGroup.length; i++) {
    const teamsPositions = table.querySelectorAll('tr')
    console.log(teamsPositions[i+1])

    const teamName = teamsPositions[i+1].firstElementChild.nextElementSibling
    teamName.textContent =`${sortedGroup[i].name}`
    const pts = teamName.nextElementSibling
    pts.textContent =`${sortedGroup[i].pts}`
    const pj = pts.nextElementSibling
    pj.textContent =`${sortedGroup[i].pj}`
    const pg = pj.nextElementSibling
    pg.textContent =`${sortedGroup[i].pg}`
    const pe = pg.nextElementSibling
    pe.textContent =`${sortedGroup[i].pe}`
    const pp = pe.nextElementSibling
    pp.textContent =`${sortedGroup[i].pe}`
    const gf = pp.nextElementSibling
    gf.textContent =`${sortedGroup[i].gf}`
    const gc = gf.nextElementSibling
    gc.textContent =`${sortedGroup[i].gc}`
    const dif = gc.nextElementSibling
    dif.textContent =`${sortedGroup[i].dif}`
  }

}
//actualiza la tabla reseteando los valores
function updateTable(tableId) {

  const groupMatches = MATCHES[`group${tableId}`]
  const groupTeams = TEAMS[`group${tableId}`]

  Object.values(groupTeams).forEach(team => {
    team.pts = 0
    team.pj = 0
    team.pg = 0
    team.pe = 0
    team.pp = 0
    team.gf = 0
    team.gc = 0
    team.dif = 0
  })
  for (let i = 0; i < groupMatches.length; i++) {
    const match = groupMatches[i]
    groupTeams.forEach(team => {
      if (team.name === match.h) {
        team.gf += match.hgf
        team.gc += match.vgf
        team.dif += match.hgf - match.vgf
        team.pj += 1
        if (match.hgf > match.vgf) {
          team.pg += 1
          team.pts += 3
        }
        else if (match.hgf < match.vgf) {
          team.pp += 1
          team.pts += 0
        }
        else if (match.hgf == match.vgf) {
          team.pe += 1
          team.pts += 1
        }
      }

      else if (team.name === match.v) {
        team.gf += match.vgf
        team.gc += match.hgf
        team.dif += match.vgf - match.hgf
        team.pj += 1
        if (match.vgf > match.hgf) {
          team.pg += 1
          team.pts += 3
        }
        else if (match.vgf < match.hgf) {
          team.pp += 1
          team.pts += 0
        }
        else if (match.vgf == match.hgf) {
          team.pe += 1
          team.pts += 1
        }
      }
    })
  }
  sortTable (tableId, groupTeams)
}
//modifica los datos del partido complpetado
function handleSubmit(event) {
  event.preventDefault()
  const match = event.target
  const teams = match.querySelectorAll('label')
  const goals = match.querySelectorAll('input')
  const home = teams[0].textContent
  const visitor = teams[1].textContent

  const homeGoals = parseInt(goals[0].value)
  const visitorGoals = parseInt(goals[1].value)

  const table = match.parentElement.parentElement.lastElementChild.id
  const matchClass = match.className
  const matchGroup = MATCHES[`group${table}`]
  const matchId = matchClass + table
  const matchData = matchGroup.find(matchData => matchData.id == matchId)
  matchData.h = home
  matchData.v = visitor

  const groupTeams = TEAMS[`group${table}`]
  groupTeams.forEach(team => {
    if (team.name === home) {
      matchData.hgf = homeGoals
      matchData.hgc += visitorGoals
      matchData.hdif = homeGoals - visitorGoals
      matchData.hpj = 1
      if (homeGoals > visitorGoals) {
        matchData.hpg += 1
        matchData.hpts = 3
      }
      else if (homeGoals < visitorGoals) {
        matchData.hpp += 1
        matchData.hpts = 0
      }
      else if (homeGoals == visitorGoals) {
        matchData.hpe += 1
        matchData.hpts = 1
      }
    }

    else if (team.name === visitor) {
      matchData.vgf = visitorGoals
      matchData.vgc += homeGoals
      matchData.vdif = visitorGoals - homeGoals
      matchData.vpj = 1
      if (visitorGoals > homeGoals) {
        matchData.vpg += 1
        matchData.vpts = 3
      }
      else if (visitorGoals < homeGoals) {
        matchData.vpp += 1
        matchData.vpts = 0
      }
      else if (visitorGoals == homeGoals) {
        matchData.vpe += 1
        matchData.vpts = 1
      }
    }
  })

  updateTable(table)
}
//limita los caracteres del input
function validateNumber(event) {
  const keyCode = event.keyCode
  const BACKSPACE = 8
  const TAB = 9
  const SUPR = 46
  const F5 = 116
  const LEFT = 37
  const RIGHT = 39

  if (
    !(
      (keyCode >= 48 && keyCode <= 57) ||
      (keyCode === BACKSPACE) ||
      (keyCode === TAB) ||
      (keyCode === SUPR) ||
      (keyCode === F5) ||
      (keyCode === LEFT) ||
      (keyCode === RIGHT)
    )

    ) {
      event.preventDefault();
    }
}

const groups = document.querySelectorAll('.group')

groups.forEach(group => {
  const matches = group.querySelectorAll('form')
  matches.forEach(match => {
    const matchInputs = match.querySelectorAll('input')
    //el formulario se envia cuando ambos inputs son completados
    matchInputs.forEach(input => {
      input.addEventListener('focusout', (event) => {
        for (input of matchInputs) {
          if (input.value === "") return
        }
        match.querySelector('button[type="submit"]').click()
      })
      input.addEventListener('keydown', validateNumber)
    })
  })
})
