// hacer apenas terminar de carga el dom
document.addEventListener('DOMContentLoaded', () => {
  let inputs = document.querySelectorAll('input[type=number]');
  for (let input of inputs) input.value = ''
  document.getElementById("PlayOffs").className ="hidden"
});

//crea los grupos y sus equipos
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
//define valores predeterminados a los grupos
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
//crea los grupos y sus partidos
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
//define valores predeterminados a los partidos
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
//define un array de tablas
const TABLES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',]

//limpia los brackets
function quickDelate(event){
  event.preventDefault()
  const bracket = document.getElementById('bracket')
  const inputs = bracket.querySelectorAll('input')
  for (let input of inputs){
    input.value = null
  }
  const allPhases = bracket.querySelectorAll('.quarters, .semis, #final')
  for (let phases of allPhases){
    const teams = phases.querySelectorAll('label') 
    for(let team of teams){
      team.textContent = 'Sin Definir'
    }
  }
  const champion = document.getElementById('champion')
  champion.textContent = null
}

//funcion general para todos los partidos de los brackets
function bracketMatch(matchData){
  const match = matchData
  const teams = match.querySelectorAll('label')
  const goals = match.querySelectorAll('input')
  const team1 = teams[0].textContent
  const team2 = teams[1].textContent
  const goal1 = parseInt(goals[0].value)
  const goal2 = parseInt(goals[1].value)
  let winner = ""
  if (goal1 > goal2){
    winner = team1
  }
  else if (goal1 < goal2){
    winner = team2
  }
  else if (goal1 == goal2){
    alert("Lamentablemente no pude crear un sistema de penales, así que volvé a poner el resultado imaginando que es el de los penales.")
    return
  }
  return winner
}

function finalSubmit(event){
  event.preventDefault()
  console.log("funca")
  const match = event.target
  //agarra el 7mo caracter de del id del formulario
  const teams = match.querySelectorAll('label')
  for (let team of teams) {
    if (team.textContent == "Sin Definir"){
      alert('Faltan Equipos para este partido')
      const goals = match.querySelectorAll('input')
      for (let goal of goals) {
        goal.value = null
      }
    return
  }
  }
  const winner = bracketMatch(match)
  if (winner.textContent == "") {
    return
  }
  const champion = document.getElementById('champion')
  champion.textContent=`¡${winner} Campeon!`
}

function semisSubmit(event){
  event.preventDefault()
  const match = event.target
  //agarra el 7mo caracter de del id del formulario
  const matchId = match.id
  const winnerId = matchId[7]
  const teams = match.querySelectorAll('label')
  for (let team of teams) {
    if (team.textContent == "Sin Definir"){
    alert('Faltan Equipos para este partido')
    const goals = match.querySelectorAll('input')
    for (let goal of goals) {
      goal.value = null
    }
    return
  }
  }
  const winner = bracketMatch(match)
  if (winner.textContent == "") {
    return
  }
  console.log(winner, winnerId)
  const Finalist = document.getElementById(`finalist${winnerId}`)
  Finalist.textContent = winner
}

function quartersSubmit(event){
  event.preventDefault()
  const match = event.target
  //agarra el 7mo caracter de del id del formulario
  const matchId = match.id
  const winnerId = matchId[7]
  const teams = match.querySelectorAll('label')
  for (let team of teams) {
    if (team.textContent == "Sin Definir"){
    alert('Faltan Equipos para este partido')
    const goals = match.querySelectorAll('input')
    for (let goal of goals) {
      goal.value = null
    }
    return
  }
  }
  const winner = bracketMatch(match)
  if (winner.textContent == "") {
    return
  }
  console.log(winner, winnerId)
  const semisTeam = document.getElementById(`quarterwinner${winnerId}`)
  semisTeam.querySelector('label').textContent = winner
}

function eighthsSubmit(event){
  event.preventDefault()
  
  const match = event.target
  //agarra el 7mo caracter de del id del formulario
  const matchId = match.id
  const winnerId = matchId[7]
  const winner = bracketMatch(match)
  if (winner == undefined) {
    return
  }
  console.log(winner, winnerId)
  const quarterTeam = document.getElementById(`eighthwinner${winnerId}`)
  quarterTeam.querySelector('label').textContent = winner
}

//activa los brackets de eliminatorias
function brackets(event){
  event.preventDefault()
  for (let i = 0; i < TABLES.length; i++) {
    const table = document.getElementById(`${TABLES[i]}`)
    const PJ = table.getElementsByClassName('pj')
    for (let td of PJ) {
      if (td.textContent != 3) {
        alert("Faltan Completar Datos de Partidos.")
        return;
      }
    }
  }
  document.getElementById("PlayOffs").className = "PlayOffs";
  
  //perdon por esta crotrada, si no no llego para el viernes
  const qualifiedTeam1 = document.getElementById('A').getElementsByClassName('team-name')[0].textContent
  const qualifiedTeam2 = document.getElementById('B').getElementsByClassName('team-name')[1].textContent
  const qualifiedTeam3 = document.getElementById('C').getElementsByClassName('team-name')[0].textContent
  const qualifiedTeam4 = document.getElementById('D').getElementsByClassName('team-name')[1].textContent
  const qualifiedTeam5 = document.getElementById('E').getElementsByClassName('team-name')[0].textContent
  const qualifiedTeam6 = document.getElementById('F').getElementsByClassName('team-name')[1].textContent
  const qualifiedTeam7 = document.getElementById('G').getElementsByClassName('team-name')[0].textContent
  const qualifiedTeam8 = document.getElementById('H').getElementsByClassName('team-name')[1].textContent
  const qualifiedTeam9 = document.getElementById('A').getElementsByClassName('team-name')[1].textContent
  const qualifiedTeam10 = document.getElementById('B').getElementsByClassName('team-name')[0].textContent
  const qualifiedTeam11 = document.getElementById('C').getElementsByClassName('team-name')[1].textContent
  const qualifiedTeam12 = document.getElementById('D').getElementsByClassName('team-name')[0].textContent
  const qualifiedTeam13 = document.getElementById('E').getElementsByClassName('team-name')[1].textContent
  const qualifiedTeam14 = document.getElementById('F').getElementsByClassName('team-name')[0].textContent
  const qualifiedTeam15 = document.getElementById('G').getElementsByClassName('team-name')[1].textContent
  const qualifiedTeam16 = document.getElementById('H').getElementsByClassName('team-name')[0].textContent

  const qualifiedTeams = [
    `${qualifiedTeam1}`,
    `${qualifiedTeam2}`,
    `${qualifiedTeam3}`,
    `${qualifiedTeam4}`,
    `${qualifiedTeam5}`,
    `${qualifiedTeam6}`,
    `${qualifiedTeam7}`,
    `${qualifiedTeam8}`,
    `${qualifiedTeam9}`,
    `${qualifiedTeam10}`,
    `${qualifiedTeam11}`,
    `${qualifiedTeam12}`,
    `${qualifiedTeam13}`,
    `${qualifiedTeam14}`,
    `${qualifiedTeam15}`,
    `${qualifiedTeam16}`,
  ]

  const eighthsTeams = document.querySelectorAll('.eighthsTeams')
  for (let [index, team] of eighthsTeams.entries()){
    team.textContent = qualifiedTeams[index]
  }
}

//genera inputs randoms para los grupos
function quickFill(event){
  event.preventDefault()
  const matches = document.querySelectorAll('.match1, .match2, .match3, .match4, .match5, .match6')
  for (let match of matches) {
    const inputs = match.querySelectorAll('input')
    for (let input of inputs) {
      input.value = Math.floor(Math.random() * 5)
    }
    match.querySelector('button[type="submit"]').click()
  }
}

//ordena y completa las tablas de grupos
function sortTable(tableId, groupTeams){
  
  const sortedGroup = groupTeams.sort((a, b)=> {
    if (a.pts === b.pts){
      return a.dif > b.dif ? -1 : 1
    } else {
      return a.pts > b.pts ? -1 : 1
  }
  })
  const table = document.getElementById(`${tableId}`)
  for (let i = 0; i < sortedGroup.length; i++) {
    const teamsPositions = table.querySelectorAll('tr')

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
    pp.textContent =`${sortedGroup[i].pp}`
    const gf = pp.nextElementSibling
    gf.textContent =`${sortedGroup[i].gf}`
    const gc = gf.nextElementSibling
    gc.textContent =`${sortedGroup[i].gc}`
    const dif = gc.nextElementSibling
    dif.textContent =`${sortedGroup[i].dif}`
  }

}

//actualiza la tabla del grupo modificado reseteando sus valores
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

//limita los caracteres de los goles
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

//eventListener para los partidos de grupos
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

//eventListener para los partidos de los brackets
const bracket = document.getElementById('bracket')
const matches = bracket.querySelectorAll('form')
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
