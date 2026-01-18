export interface IWCFDrillingQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  image?: string;
}

export const iwcfDrillingQuestions: IWCFDrillingQuestion[] = [
  // Risk Management Section
  {
    id: 1,
    question: "What is one essential requirement of a management of change (MOC) procedure?",
    options: [
      "Only the accountable manager can do a MOC risk assessment.",
      "All changes to a procedure require authorization and documentation by the accountable manager.",
      "Changes to drilling procedures only require authorization and documentation by the assistant Driller.",
      "A change to procedure can be authorized using a previous risk assessment."
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "What is one essential requirement of a management of change (MOC) procedure?",
    options: [
      "All changes of procedure require a new risk assessment to be done.",
      "Changes to drilling procedures only require authorization and documentation by the Assistant Driller.",
      "Only team leaders must be aware of agreed change before starting the operation.",
      "Only the accountable manager can do a MOC risk assessment."
    ],
    correctAnswer: 0
  },
  {
    id: 3,
    question: "A management of change (MOC) process will be required to continue operations. What is a key step of this process?",
    options: [
      "Training.",
      "Data analysis.",
      "Risk assessment."
    ],
    correctAnswer: 2
  },
  {
    id: 4,
    question: "What is the practical use of applying the risk assessment process to well control operations planning?",
    options: [
      "It creates a risk assessment diagram signed by authorized personnel who would be held liable for any well control incident.",
      "It helps to identify and rank risks, and to develop proactive measures and responses to reduce the probability and severity of incidents.",
      "It helps to analyses the damage after a well control incident.",
      "It sets reporting procedures and ensures actions during a well control event are approved by company officials and regulators."
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "What is a key benefit of using checklists in a well control situation?",
    options: [
      "Checklists reduce communication with the rig crew.",
      "Checklists reduce possible errors when completing tasks.",
      "Checklists reduce the requirements for training.",
      "Checklists reduce the requirements for well control procedures."
    ],
    correctAnswer: 1
  },
  // Barriers Section
  {
    id: 6,
    question: "What type of well barrier elements are required to form a barrier envelope?",
    options: [
      "A combination of well barrier elements that prevent flow to the environment or to an open formation.",
      "A combination of well barrier elements to prevent flow into open formation.",
      "Several BOP rams to prevent flow to the environment.",
      "The wellhead, casing and cement in a well."
    ],
    correctAnswer: 0
  },
  {
    id: 7,
    question: "Which correct action should be taken if a well barrier fails while testing, as per API Standard RP 53?",
    options: [
      "Tightening, Repair or any other work must be done under pressure then retest it again.",
      "It is not important neither to pressure test this barrier after fixing the problem nor the corrective action.",
      "Bleed off pressure to half pressure, repair and pressure test it.",
      "Tightening, Repair or any other work must done only after verification that all pressure is released and all parties are agreed that no chance of trapped pressure."
    ],
    correctAnswer: 3
  },
  {
    id: 8,
    question: "You are drilling through production casing into a reservoir section. In addition to the drilling fluid which barrier element will make up the barrier envelope?",
    options: [
      "Cemented production casing, well head, wellhead side outlet valves, casing hanger, the drilling BOP and IBOP.",
      "Drilling BOP and IBOP, the drilling diverter system, and reservoir formation.",
      "Ported drill string flapper valve, the reservoir formation and the cemented well conductor.",
      "The drilling diverter system, the cemented well conductor and the reservoir formation."
    ],
    correctAnswer: 0
  },
  {
    id: 9,
    question: "What are the key requirements of a barrier test document? Select 2 answers",
    options: [
      "All barrier test documents must be signed by an authorized person.",
      "All test documents must be retained at head office for a period of six months",
      "Barrier test pressure must be recorded.",
      "All barrier test documents can be destroyed after a successful test.",
      "If there is a successful function test, there is no need for pressure test documentation."
    ],
    correctAnswer: 0 // Note: This is a multi-select question, correctAnswer indicates first correct option
  },
  {
    id: 10,
    question: "What should you do if an annular BOP fails its pressure test?",
    options: [
      "You should remove the annular from service.",
      "You should repair it immediately and then re-test it.",
      "You do not need to retest it until the next planned test date.",
      "No action is required if the rams are successfully tested."
    ],
    correctAnswer: 0
  },
  {
    id: 11,
    question: "Who is authorized to sign the test chart?",
    options: [
      "Mechanic",
      "Pump operator, drilling contractor representative and operator representative.",
      "BOP engineer",
      "Electrician",
      "Driller or Senior Tool Pusher"
    ],
    correctAnswer: 4
  },
  {
    id: 12,
    question: "What are the important requirements for well barrier testing?",
    options: [
      "Pressure test one time for each well. Maintain accurate records. Test documents signed by the onshore rig manager.",
      "Follow an approved test procedure. Maintain accurate records. Test documents signed by responsible persons.",
      "Keep records for wellhead testing. Follow an approved procedure. Maintain records on the rig for two years.",
      "Pressure test one time for each well. Follow an approved test procedure. Maintain accurate records."
    ],
    correctAnswer: 1
  },
  {
    id: 13,
    question: "Which of the following is necessary to maintain primary well control during tripping?",
    options: [
      "The hydrostatic pressure exerted by the drilling mud column must remain higher than the formation pressure",
      "Mud pumps must be in good working order",
      "A minimum of one inside blowout preventer (IBOP) must be available on the drill floor",
      "The level in the active tank must be constant"
    ],
    correctAnswer: 0
  },
  {
    id: 14,
    question: "From a well control point of view, what is the primary reason for performing a check trip followed by bottoms up circulation?",
    options: [
      "To verify that the pressure surge during the running in of the pipe will not lead to lost circulation",
      "To reduce the thickness of the filter cake",
      "To cool the bit",
      "To verify that the primary well control can be maintained during the pulling of the pipe."
    ],
    correctAnswer: 3
  },
  {
    id: 15,
    question: "What is the correct definition of \"primary well control\" during normal drilling operation?",
    options: [
      "Preventing a kick by maintaining drilling mud hydrostatic pressure equal to or greater than formation pressure.",
      "Preventing the flow of formation fluid into the well bore by maintaining the sum of drilling mud hydrostatic pressure and dynamic pressure loss in the annulus equal to or greater than formation pressure.",
      "Preventing the flow of formation fluid into the well bore by keeping the dynamic pressure loss in the annulus equal to or greater than formation pressure.",
      "Preventing the flow of formation fluid into the well bore by using BOP equipment when the hydrostatic pressure in the well bore does not balance or exceed the formation pressure."
    ],
    correctAnswer: 0
  },
  {
    id: 16,
    question: "Which statement describes the secondary well barrier?",
    options: [
      "A secondary well barrier is the secondary object that prevents flow from a source",
      "A secondary well barrier will not prevent flow from a source",
      "A secondary well barrier controls the closure of blow out preventer",
      "A secondary well barrier is the first object that prevents flow to well bore."
    ],
    correctAnswer: 0
  },
  {
    id: 17,
    question: "What conditions should be in drilling fluid to be considered as primary wellbore barrier element?",
    options: [
      "Density needs to be correct, the well needs to be always filled by drilling fluid, any gains or losses must be monitored.",
      "Density needs to be correct, drilling fluid must be checked every 30 minutes, mud engineer must provide full report.",
      "Density needs to be correct, drilling fluid must be checked every 30 minutes, BOP must be closed when detecting any gain or loss.",
      "Density needs to be correct, mud engineer must provide full report, Mud Pit volume must be monitored."
    ],
    correctAnswer: 0
  },
  {
    id: 18,
    question: "Pressure has built up between two casing strings in a well, a poor cement job has been performed on the inner casing string, what could the consequences of this pressure build-up be? Select THREE ANSWERS",
    options: [
      "The inner casing could collapse",
      "The ECD will increase",
      "These could be different sticking",
      "The formation below the outer casing shoe could fracture",
      "The outer casing could burst"
    ],
    correctAnswer: 0 // Note: Multi-select - a, d, e are correct
  },
  {
    id: 19,
    question: "The production string of well is displaced to clean water. A cement bond log then identifies a poor cement job between the production and intermediate casing string. If pressure builds up in the annulus between these casing strings, what is the immediate risk to well integrity?",
    options: [
      "There could be differential sticking.",
      "The formation below the outer casing shoe could fracture.",
      "The inner casing could collapse.",
      "The ECD will increase."
    ],
    correctAnswer: 2
  },
  {
    id: 20,
    question: "The production string of well is displaced to weighted completion fluid. A cement bond log then identifies a poor cement job between the production and intermediate casing string. If pressure builds up in the annulus between these casing strings, what is the immediate risk to well integrity?",
    options: [
      "There could be differential sticking.",
      "The outer casing could burst.",
      "The inner casing could collapse.",
      "The ECD will increase."
    ],
    correctAnswer: 1
  },
  {
    id: 21,
    question: "A cement bond log has identified a poor cement job between the production and intermediate casing string. Pressure has built up in the annulus between these casing strings, what is the long term risk to well control?",
    options: [
      "There could be differential sticking.",
      "The outer casing could burst.",
      "The inner casing could burst.",
      "The ECD will increase."
    ],
    correctAnswer: 1
  },
  // Pressures in the Earth's Crust Section
  {
    id: 22,
    question: "What is the most common cause of abnormally high formation pressures worldwide?",
    options: [
      "Under-compacted shales.",
      "Carbonate layers.",
      "Depleted sands."
    ],
    correctAnswer: 0
  },
  {
    id: 23,
    question: "Which one of the following values is generally accepted as a normal formation pore pressure gradient?",
    options: [
      "0.508 psi/ft",
      "0.442 psi/ft",
      "0.42 psi/ft",
      "0.465 psi/ft"
    ],
    correctAnswer: 3
  },
  {
    id: 24,
    question: "What is meant by abnormal pressure?",
    options: [
      "The excess pressure due to circulating mud at high rates.",
      "The excess pressure that needs to be applied to cause 'leak-off.",
      "Heavy weight mud used to give an overbalance.",
      "The formation fluid pressure that exceeds formation water hydrostatic pressure."
    ],
    correctAnswer: 3
  },
  // Static and Dynamic Pressures Section
  {
    id: 25,
    question: "Which one of the following will affect Bottom-hole pressure (BHP) while circulating at a constant flow rate? Select TWO ANSWERS",
    options: [
      "Mud density",
      "Annulus pressure loss",
      "Pump pressure",
      "Pressure loss through the bit nozzles"
    ],
    correctAnswer: 0 // Note: Multi-select - a, b are correct
  },
  {
    id: 26,
    question: "The equivalent circulating density (ECD) determines the actual bottom hole pressure while circulating. Which part of the system pressure losses contributes to the ECD?",
    options: [
      "The pressure loss in the surface system",
      "The pressure loss over the nozzles",
      "The pressure loss in the drill string",
      "The pressure loss in the annulus",
      "The pressure loss in the open hole section only"
    ],
    correctAnswer: 3
  },
  {
    id: 27,
    question: "During normal drilling operation, 20 bbl of light mud is pumped into the string followed by original mud. The driller shuts down while the light mud is still inside the drill pipe to observe the well. Which of the following statements is correct?",
    options: [
      "Bottom hole pressure will drop.",
      "Bottom hole pressure will remain the same, but a back pressure will show at the drill pipe.",
      "Pit volume will increase",
      "Bottom hole pressure will increase"
    ],
    correctAnswer: 1
  },
  {
    id: 28,
    question: "Which factors will affect Bottom Hole Pressure (BHP) while circulating at a constant flow rate? (TWO ANSWERS)",
    options: [
      "Annulus pressure losses",
      "Drill string pressure loss.",
      "Drilling fluid density"
    ],
    correctAnswer: 0 // Note: Multi-select - a, c are correct
  },
  {
    id: 29,
    question: "The pit level increase when the pumps are off, but the pit level stays constant when the pumps are running. What could be the problem?",
    options: [
      "The HP is greater than FP.",
      "The pumps have failed.",
      "The pump pressure is greater than HP.",
      "APLs (annular pressure loss) are creating an overbalance that prevents the well from flowing."
    ],
    correctAnswer: 3
  },
  {
    id: 30,
    question: "The pit level increases when the pumps are off, while it stays constant while the pumps are running. What could be the problem?",
    options: [
      "The hydrostatic pressure is greater than the formation pressure.",
      "Annular pressure losses are creating an overbalance that prevent the flow.",
      "The pump pressure is greater than the hydrostatic pressure.",
      "The pumps have failed."
    ],
    correctAnswer: 1
  },
  {
    id: 31,
    question: "If light pill is pumped in the drill string and followed by 10 bbls original mud, what can it lead to after disconnect the Top Drive/Kelly if the light pill doesn't come out from the nozzles? (NO FLOAT VALVE IN THE STRING)",
    options: [
      "Reduction in the bottom hole pressure",
      "Increase in the overbalance",
      "Nothing will happen",
      "Back flow from the drill string"
    ],
    correctAnswer: 3
  },
  {
    id: 32,
    question: "With the pumps running continuously a heavy mud pill is circulated. When will bottom hole pressure start to increase (ignore dynamic pressure losses in the well)?",
    options: [
      "Once all the pill is in the annulus.",
      "Once the pill starts to be displaced into the annulus.",
      "As soon as the pill is pumped into the drill string.",
      "Once all the pill is inside the drill string and is about to exit the bit."
    ],
    correctAnswer: 1
  },
  {
    id: 33,
    question: "Which factors affect bottomhole pressure during cementing operations?",
    options: [
      "The combined hydrostatic pressure of the drilling fluid, spacer and cement slurry in the wellbore. Annular pressure losses (APL)."
    ],
    correctAnswer: 0
  },
  // Lost Circulation Section
  {
    id: 34,
    question: "When drilling, there is a complete loss of returns and no drilling fluid is visible when you look down the hole. What should you do first?",
    options: [
      "Pump lost circulation material (LCM) immediately.",
      "Fill the annulus with water at surface and record the added volume.",
      "Pump a cement plug into the annulus through the kill line.",
      "Pump a heavy slug into the annulus through the kill line."
    ],
    correctAnswer: 1
  },
  {
    id: 35,
    question: "While drilling the reservoir section, there is total loss of circulation. What is the first action to take?",
    options: [
      "Keep drilling. Pump LCM at high rate.",
      "Pump cement plugged.",
      "Stop drilling, assess, and try to establish static fluid level & prepare LCM."
    ],
    correctAnswer: 2
  },
  {
    id: 36,
    question: "Drilling was stopped before entering a depleted sand formation where severe losses were expected. What actions should be taken before drilling can continue?",
    options: [
      "Displace the well to the lowest possible drilling fluid density. Prepare a lost circulation material (LCM) pill and displace it into the annulus.",
      "Circulate bottoms-up to condition the drilling fluid. Prepare and pump lost circulation material (LCM) to the bit.",
      "Displace the well to kill-density drilling fluid. Ensure both pumps are working at maximum SPM.",
      "Displace the well to water. Increase the rotary speed to ensure the highest penetration rate to drill through the depleted zone."
    ],
    correctAnswer: 1
  },
  {
    id: 37,
    question: "The driller fails to fill the hole when pulling out of the well. The drilling fluid level drops 580 ft causing the well to flow.\n\nCurrent drilling fluid: 11.9 ppg.\nTVD 9500 feet\n\nWhat is the BHP when the well starts to flow?",
    options: [
      "5524 psi",
      "5876 psi",
      "5524 psi",
      "5160 psi"
    ],
    correctAnswer: 3
  },
  {
    id: 38,
    question: "What is the reduction in BHP if the drilling fluid level dropped by 800 ft with a density of 10.5 ppg?",
    options: [
      "437 psi",
      "420 psi",
      "437 psi",
      "450 psi"
    ],
    correctAnswer: 0
  },
  {
    id: 39,
    question: "A well is drilled to depth of 8200 ft TVD and current mud density is 12.5 ppg.\n\nWhat is BHP if 580 psi pressure is applied from surface with the BOP closed?",
    options: [
      "4750 psi",
      "5910 psi",
      "5330 psi",
      "5076 psi"
    ],
    correctAnswer: 1
  },
  {
    id: 40,
    question: "While drilling. There are severe losses. After the pumps are stopped. The drilling fluid in the well drops far below the flow line. The well is then filled to top with water.\n\nDrilling fluid density: 11.3 ppg\nWater density: 8.6 ppg\nHeight of water to fill the annulus is 200 ft.\n\nWhat is the decrease in hydrostatic BHP?",
    options: [
      "118 psi",
      "28 psi",
      "89 psi",
      "207 psi"
    ],
    correctAnswer: 1
  },
  {
    id: 41,
    question: "There is a total power loss. Partial losses are measured at 10 bbl./hour. Capacity of annulus and pipe contents-0.073 bbl./ft. Drilling fluid density – 10.8 ppg. What will be the reduction in BHP after 3 hours if hole cannot be filled?",
    options: [
      "300 psi",
      "231 psi",
      "77 psi",
      "420 psi"
    ],
    correctAnswer: 1
  },
  {
    id: 42,
    question: "Calculate bottom hole hydrostatic pressure using the information below:\n\nMD: 18575 FT.\nTVD: 16281 FT.\nShoe TVD: 12875 FT.\nMaximum allowable drilling fluid density: 17.8 ppg.\nCurrent drilling fluid density: 14.7 ppg.",
    options: [
      "12445 psi",
      "11917 psi",
      "9842 psi.",
      "14199 psi."
    ],
    correctAnswer: 0
  },
  {
    id: 43,
    question: "A well 10400 ft TVD is filled with 9.2 ppg brine. The plan is to run in hole to 5100 ft TVD 5400 ft MD and displace with drill water 8.4 ppg. What is hydrostatic pressure at 10400 ft when the drill water is circulated back to surface?",
    options: [
      "4640",
      "4542",
      "4763",
      "4975"
    ],
    correctAnswer: 3
  },
  {
    id: 44,
    question: "Formation pressure at 10750 feet MD, 9200 ft. TVD is balanced by 10.6ppg drilling fluid.\n\nA 250-psi trip margin must be included in drilling fluid density.\n\nWhat drilling fluid density would be required?",
    options: [
      "11.2 ppg",
      "10.6 ppg.",
      "11.0 ppg.",
      "10.1 ppg."
    ],
    correctAnswer: 0
  },
  {
    id: 45,
    question: "Formation pressure at 14650 feet TVD is balanced by 12.3 ppg drilling fluid.\n\nA 200-psi trip margin must be included in drilling fluid density.\n\nWhat drilling fluid density would be required?",
    options: [
      "12.6 ppg",
      "12.5 ppg.",
      "12 ppg.",
      "12.1 ppg."
    ],
    correctAnswer: 0
  },
  {
    id: 46,
    question: "When drilling at 17750 ft MD, 14650 ft. TVD, Formation pressure is balanced by 12.3 ppg drilling fluid.\n\nA 350-psi trip margin must be included in drilling fluid density.\n\nWhat drilling fluid density would be required?",
    options: [
      "12.8 ppg",
      "12.5 ppg",
      "12.6 ppg",
      "12.3 ppg"
    ],
    correctAnswer: 0
  },
  {
    id: 47,
    question: "Calculate the fluid density if the fluid gradient is 0.884 psi/ft.",
    options: [
      "17.0 ppg",
      "16.5 ppg",
      "17.5 ppg",
      "18.0 ppg"
    ],
    correctAnswer: 0
  },
  {
    id: 48,
    question: "When drilling at 11111 feet MD 10780 feet TVD, FP is expected to be 6334 psi.\n\nA 200 psi trip margin must be included in the drilling fluid density.\n\nWhat drilling fluid density is required?",
    options: [
      "11.7 ppg",
      "11.3 ppg",
      "11.6 ppg",
      "12.0 ppg"
    ],
    correctAnswer: 2
  },
  {
    id: 49,
    question: "You expect the formation pressure to be 6334 psi at 10780 ft. TVD.\n\nYou must include a 200-psi trip margin in the drilling fluid density.\n\nWhat drilling fluid density will you need?",
    options: [
      "11.7",
      "10.9",
      "11.3",
      "12.1"
    ],
    correctAnswer: 2
  },
  {
    id: 50,
    question: "When drilling at (9650 feet MD) 8350 feet TVD, FP is expected to be 4430 psi.\n\nA 250 psi trip margin must be included in the drilling fluid density.\n\nWhat drilling fluid density is required?",
    options: [
      "10.8 ppg",
      "10.2 ppg",
      "10.5 ppg",
      "11.0 ppg"
    ],
    correctAnswer: 0
  },
  {
    id: 51,
    question: "When drilling at 8350 feet TVD, FP is expected to be 4430 psi. A 250 psi trip margin must be included in the drilling fluid density. What drilling fluid density is required?",
    options: [
      "10.2 ppg",
      "12 ppg",
      "10.8 ppg",
      "9.6 ppg"
    ],
    correctAnswer: 2
  },
  {
    id: 52,
    question: "A well is drilled to depth of 8200 ft TVD and current mud density is 12.5 ppg. What will the fluid pressure be at 4920 feet TVD if 580 psi pressure is applied from surface with the BOP closed?",
    options: [
      "4750 psi",
      "2618 psi",
      "3778 psi",
      "3198 psi"
    ],
    correctAnswer: 2
  },
  {
    id: 53,
    question: "A well is drilled to depth of 8200 ft TVD and current mud density is 12.5 ppg. What is BHP if 580 psi pressure is applied from surface with the BOP closed?",
    options: [
      "4750 psi",
      "5910 psi",
      "5330 psi",
      "5076 psi"
    ],
    correctAnswer: 1
  },
  {
    id: 54,
    question: "Before pulling out of hole, the drilling fluid density is increased by 0.5 ppg trip margin.\n\nWith this trip margin, calculate the increase in BHP.\n\nWELL DATA:\nTVD: 8300 ft.\nMD: 8900 ft.\nDrilling fluid density with this trip margin: 11.2 ppg.\nDrill pipe capacity: 0.01782 bbl./ft.\nDrill pipe metal displacement: 0.00751 bbl.",
    options: [
      "216 psi",
      "231 psi",
      "200 psi",
      "250 psi"
    ],
    correctAnswer: 0
  },
  {
    id: 55,
    question: "If the gas/water contact in a normally pressured reservoir is at 3950 ft, what is the pressure at the top of the reservoir at 3470 feet? (There is a gas gradient of 0.1 psi/ft. and formation water gradient of 0.464 psi/ft)",
    options: [
      "1630 psi.",
      "1870 psi.",
      "1350 psi.",
      "1785 psi."
    ],
    correctAnswer: 0
  },
  {
    id: 56,
    question: "A heavy mud pill is circulated around a well. When will BHP start to increase? Ignore dynamic pressure losses in the well?",
    options: [
      "When the driller starts to pump the pill into the drill string.",
      "When the driller starts to displace the pill into the annulus.",
      "When the driller has pumped the all pill into the drill string before it exits the bit.",
      "When the driller has pumped the entire pill into the annulus."
    ],
    correctAnswer: 1
  },
  {
    id: 57,
    question: "A driller prepares to pull out of the hole and lines up to the slug pit. The driller then pumps a 20 bbl. Heavy slug. Followed by 10 bbl. Of drilling fluid from the active pit.\n\nWell Data:\nDepth of hole (RKB): 9200 feet.\nDrilling fluid density: 12.2 ppg.\nHeavy slug density: 14.5 ppg.\nDrill pipe capacity: 0.01776 bbl./ft.\nSurface line volume: 6 bbl.\n\nHow far will the fluid level in the string drop when the well has equalized?",
    options: [
      "263 feet.",
      "213 feet.",
      "1143 feet.",
      "183 feet."
    ],
    correctAnswer: 1
  },
  {
    id: 58,
    question: "The driller pumps a heavy slug and displaces it to the drillpipe with active pit fluid. What effect will this have on the fluid pits after disconnecting the top drive?",
    options: [
      "No change in volume.",
      "Decrease in volume.",
      "Increase in volume."
    ],
    correctAnswer: 2
  },
  // Top Hole Section
  {
    id: 59,
    question: "Formation strengths are generally weak when drilling top hole and total losses may occur. How can the risk of total losses be reduced when drilling top hole?",
    options: [
      "By pumping slowly to reduce the drill string pressure loss.",
      "Keeping a high overbalance.",
      "By controlling penetration rate to prevent loading the annulus with cuttings.",
      "Reduce the Mud weight as possible to reduce the risk of formation fracture."
    ],
    correctAnswer: 2
  },
  {
    id: 60,
    question: "Which of the following statements are good operating practices when drilling TOPHOLE formations where there is a risk of shallow gas? (TWO ANSWERS)",
    options: [
      "Maintain high rate of penetration and keep mud viscosity as high as possible.",
      "Use a heavy weight mud to create maximum overbalance.",
      "Pump out of the hole on trips.",
      "Use oil-based mud.",
      "Drill a pilot hole at a controlled rate."
    ],
    correctAnswer: 2 // Note: Multi-select - c, e are correct
  },
  {
    id: 61,
    question: "During top hole drilling from a jack-up rig, the well starts to flow due to shallow gas. What will be the safest action to take to secure the safety of the rig and personnel? (TWO ANSWERS)",
    options: [
      "Start pumping mud into the well at the highest possible rate.",
      "Activate the diverter system and remove non-essential personnel from the rig floor.",
      "Shut in the well and prepare for kill operation.",
      "Activate the blind/share ram to shut in the well.",
      "First, line up to the mud/gas separator, close the diverter and send personnel from the rig floor."
    ],
    correctAnswer: 1 // Note: Multi-select - a, b are correct
  },
  {
    id: 62,
    question: "When drilling top hole with a risk of shallow gas, which actions are considered good practice? (TWO ANSWERS)",
    options: [
      "Drill a pilot hole at a slow controlled rate.",
      "Maintain high Rate of Penetration (ROP) so that fluid viscosity is as high as possible.",
      "Pump out of the hole while tripping",
      "Regularly pump a fresh water pill to clean cuttings from the hole.",
      "Use heavy density fluid to create maximum overbalance"
    ],
    correctAnswer: 0 // Note: Multi-select - a, c are correct
  },
  {
    id: 63,
    question: "When top hole drilling, a well starts to flow due to shallow gas. What is the safest action to take to secure the safety of rig and personnel?",
    options: [
      "Activate the blind/shear rams to shut in the well",
      "Activate the diverter system, and remove non-essential personnel from the rig floor and hazardous areas.",
      "Line up the Mud Gas Separator, (MGS), activate the diverter system and remove personnel from the rig floor",
      "Shut in the well and prepare for kill operations immediately"
    ],
    correctAnswer: 1
  },
  {
    id: 64,
    question: "Is it true that shallow gas kicks are easier to handle than those taken when drilling deeper?",
    options: [
      "Yes.",
      "No."
    ],
    correctAnswer: 1
  },
  {
    id: 65,
    question: "What is the consequence of losing Bottom Hole Pressure (BHP) while drilling top hole through a gas bearing formation?",
    options: [
      "An increase in cuttings builds up.",
      "Loss of BHP may cause the pipe to become stuck.",
      "Top hole usually drilled with water so there is no loss of BHP.",
      "Gas around the rig may lead to an increased risk of explosion"
    ],
    correctAnswer: 3
  },
  {
    id: 66,
    question: "Which action is considered good practice when drilling top hole with a risk of shallow gas? (SELECT 3 ANSWERS)",
    options: [
      "Controlling the drilling rate.",
      "Maintaining a high overbalance.",
      "Pumping while pulling out of hole.",
      "Maintaining a high ROP.",
      "Keeping the drilling fluid viscosity high.",
      "Drilling pilot holes."
    ],
    correctAnswer: 0 // Note: Multi-select - a, c, f are correct
  },
  {
    id: 67,
    question: "You are diverting shallow gas kick overboard. What problems could this cause?",
    options: [
      "The remote choke will become either plugged or washed out.",
      "The well could bridge-over due to pumping kill fluid at high pump rate.",
      "While diverting the shallow gas kick overboard, the diverting system could quickly erode.",
      "It will be difficult to track the pressure drop if kill fluid is pumped to bit."
    ],
    correctAnswer: 2
  },
  // L.O.T. and MAASP Section
  {
    id: 68,
    question: "What will happen to MAASP if Mud density is increased?",
    options: [
      "MAASP will stay the same.",
      "MAASP will increase.",
      "MAASP will decrease."
    ],
    correctAnswer: 2
  },
  {
    id: 69,
    question: "Which of the following need to be known for a leak-off test to be correct? (TWO ANSWERS)",
    options: [
      "The mud density in the well.",
      "The volume of mud in the annulus from casing shoe to surface.",
      "Slow circulating rate.",
      "The pressure limit for the mud pump.",
      "Mud hydrostatic pressure in the casing annulus.(TVD)"
    ],
    correctAnswer: 0 // Note: Multi-select - a, e are correct
  },
  {
    id: 70,
    question: "Which information do you need for an accurate Leak Off Test (LOT). Choose two answers.",
    options: [
      "The fluid density in the well.",
      "The fluid pump circulating rate for the next drilling operation.",
      "The pressure limit for the fluid pump",
      "The True Vertical Depth (TVD) of the casing shoe.",
      "The volume of fluid in the annulus from casing shoe to surface"
    ],
    correctAnswer: 0 // Note: Multi-select - a, d are correct
  },
  {
    id: 71,
    question: "When performing a Leak-Off Test (LOT), which parameter must be accurately measured and recorded?",
    options: [
      "Fluid volume in open hole, density of the fluid used, and the True Vertical Depth.",
      "Fluid volume in the casing, and Measured Depth (MD).",
      "Pumping time until the leak-off, and the Measured Depth (MD).",
      "Fluid volume pumped, density of the fluid used, and True Vertical Depth."
    ],
    correctAnswer: 3
  },
  {
    id: 72,
    question: "You are preparing to do a formation integrity test (FIT) after drilling out the last casing shoe on a production well. The well contains water-based drilling fluid with lost circulation material (LCM). What action should you take?",
    options: [
      "Continue with the formation integrity test (FIT). LCM will not affect the results of FIT.",
      "Continue the formation integrity test (FIT). After the test, add a 10% safety margin to the results to compensate for the LCM in the drilling fluid.",
      "Displace the well to oil-based fluid for more accurate results.",
      "Displace the well to kill fluid to create a safety margin in case the well kicks during the test."
    ],
    correctAnswer: 0
  },
  {
    id: 73,
    question: "What is one condition required for a successful leak off test?",
    options: [
      "There must be a constant drilling fluid density in the well.",
      "The ICP must be used.",
      "The hole must be drilled to total depth (TD).",
      "The casing pressure test value will equal the LOT value."
    ],
    correctAnswer: 0
  },
  {
    id: 74,
    question: "Which parameters would affect the LOT pressure?",
    options: [
      "The volume of the fluid in the annulus from casing shoe to surface.",
      "The fluid pump circulation rate.",
      "The hydrostatic pressure at the casing shoe.",
      "The pressure limit for the fluid pump."
    ],
    correctAnswer: 2
  },
  {
    id: 75,
    question: "Which factors can affect the MAASP?",
    options: [
      "The maximum allowable pump pressure, the low gravity solids content of the drilling fluids, and the pump efficiency.",
      "The water loss of the drilling fluid, the formation pressure at the casing shoe, and the solids content of the drilling fluid.",
      "The diameter of the last casing string, the fracture of the formations behind the casing shoe, and the kill fluid density.",
      "The depth of the last casing shoe, the fracture pressure of the formation at the casing shoe and the drilling fluid density."
    ],
    correctAnswer: 3
  },
  {
    id: 76,
    question: "When performing LOT which parameters must be accurately measured and recorded?",
    options: [
      "Fluid volume in open hole. Density of fluid used and TVD.",
      "Fluid volume pumped. Density of fluid used and TVD.",
      "Fluid volume in casing, and MD.",
      "Pumping time until the leak off and MD."
    ],
    correctAnswer: 1
  },
  {
    id: 77,
    question: "After completing a leak off test it is important to circulate bottom up. Why is this important?",
    options: [
      "To cool down the drill pipe.",
      "To condition the drilling fluid.",
      "To ensure the well is stable.",
      "To establish a slow circulating rate."
    ],
    correctAnswer: 2
  },
  {
    id: 78,
    question: "Where should the depth be set for an accurate LOT?",
    options: [
      "Just below the casing shoe.",
      "At the depth of the top of the reservoir.",
      "A minimum of 10 meters inside the open hole.",
      "At the depth of the last casing shoe."
    ],
    correctAnswer: 0
  },
  {
    id: 79,
    question: "What important information can be obtained from the results of an LOT?",
    options: [
      "An accurate estimate of reservoir pressure.",
      "Information that enables accurate surge pressures to be calculated.",
      "Information that enables the MAASP to be calculated.",
      "Information for the casing design."
    ],
    correctAnswer: 2
  },
  {
    id: 80,
    question: "Which information do you need for an accurate LOT?",
    options: [
      "The fluid pump circulating rate for the next drilling operation.",
      "The pressure limit for the fluid pump.",
      "TVD of the casing shoe.",
      "The volume of fluid in the annulus from casing shoe to surface.",
      "The fluid density in the well."
    ],
    correctAnswer: 2 // Note: Multi-select - c, e are correct
  },
  {
    id: 81,
    question: "In which situation would you expect formation fracture pressure to change?",
    options: [
      "When the SIDPP is higher than the MAASP.",
      "When drilling into a new open hole formation.",
      "Every time the drilling fluid density is changed.",
      "On the BHA or bit is changed."
    ],
    correctAnswer: 1
  },
  {
    id: 82,
    question: "Which conditions in a well increase the risk of reaching the MAASP during a well kill operation?",
    options: [
      "Small bit nozzles.",
      "A small influx.",
      "A large difference between formation breakdown pressure and mud hydrostatic pressure.",
      "A long open hole section.",
      "A short open hole section.",
      "A large influx.",
      "A small difference between formation breakdown pressure and mud hydrostatic pressure."
    ],
    correctAnswer: 5 // Note: Multi-select - d, f, g are correct
  },
  {
    id: 83,
    question: "The leakoff test (LOT) at the last casing shoe allows the kick tolerance to be calculated for the hole section. What will happen to the kick tolerance value if the well is drilled below the planned depth for the hole section?",
    options: [
      "The kick tolerance will increase.",
      "The kick tolerance will decrease.",
      "The kick tolerance stays the same."
    ],
    correctAnswer: 1
  },
  {
    id: 84,
    question: "Calculate the MAASP with the following information:\n\nWell data:\nCasing shoe TVD: 6800 ft.\nDrilling fluid density: 15 ppg.\nMaximum allowable drilling fluid density: 16.7 ppg.",
    options: [
      "601 psi",
      "700 psi",
      "550 psi",
      "650 psi"
    ],
    correctAnswer: 0
  },
  {
    id: 85,
    question: "Calculate the MAASP with the following information:\n\nWell data:\nCasing shoe TVD: 8000 ft.\nDensity of drilling fluid: 12 ppg.\nMaximum allowable drilling fluid density: 19 ppg.",
    options: [
      "2912 psi",
      "3000 psi",
      "2800 psi",
      "2750 psi"
    ],
    correctAnswer: 0
  },
  {
    id: 86,
    question: "Calculate the MAMW with the following information:\n\nWell data:\nCasing shoe TVD: 8000 ft.\nFluid density in the hole: 10.4 ppg.\nLeak off test (LOT): 1500 psi.",
    options: [
      "14.0 ppg",
      "13.5 ppg",
      "14.5 ppg",
      "13.0 ppg"
    ],
    correctAnswer: 0
  },
  {
    id: 87,
    question: "After conditioning the well with 12 ppg mud, the driller does a leak-off test (LOT) at 5000 feet TVD, and records a LOT pressure of 875 psi\n\nCalculate the maximum allowable mud density.",
    options: [
      "14.5 ppg",
      "15.3 ppg",
      "12 ppg",
      "13.2 ppg"
    ],
    correctAnswer: 1
  },
  {
    id: 88,
    question: "Calculate the MAASP with the information below:\n\nWELL DATA:\nHole depth MD: 13600 ft.\nHole depth TVD: 12800 ft.\nCasing shoe depth MD: 9100 ft.\nCasing shoe depth TVD: 8600 ft.\nDrilling fluid density: 11.5 ppg.\nFormation strength gradient: 0.828 psi/ft.",
    options: [
      "595 psi",
      "650 psi",
      "500 psi",
      "700 psi"
    ],
    correctAnswer: 0
  },
  {
    id: 89,
    question: "Calculate the Maximum allowable mud weight (MAMW) using information below.\n\nWELL DATA:\nCasing shoe depth: 9000 ft. TVD.\nLOT: 1800 psi.\nDensity of drilling mud in hole: 11.4 ppg.",
    options: [
      "15.2 ppg",
      "14.8 ppg",
      "15.5 ppg",
      "14.5 ppg"
    ],
    correctAnswer: 0
  },
  {
    id: 90,
    question: "Leak-off test data: Casing shoe MD: 6090 ft. Casing shoe TVD: 5560 ft.\nSurface leak off pressure at 6090 ft.: 380 psi.\nDrilling fluid density: 12.8 ppg\n\nDrilling continues after the leak off test, and later there is a kick.\n\nKick data:\nHole depth MD: 7810 ft.\nHole depth TVD: 6315 ft.\nSIDPP: 140 psi.\nSICP: 180 psi.\nPit gain: 8 bbl.\nDrilling fluid density: 13.5 ppg.\n\nCalculate the working margin between the MAASP and the initial shut in casing pressure.",
    options: [
      "47 psi",
      "No margin.",
      "87 psi.",
      "18 psi."
    ],
    correctAnswer: 2
  },
  {
    id: 91,
    question: "After a leak off test using 10.3 ppg test fluid,\ncasing shoe fracture pressure is calculated at 5730 psi.\nMaximum anticipated APL at drilling rate for the section is 350 psi.\nCasing shoe TVD is 8640 ft.\n\nWhat is the maximum drilling fluid density that can be circulated without losses?",
    options: [
      "11.9 ppg",
      "12.0 ppg",
      "12.5 ppg",
      "11.5 ppg"
    ],
    correctAnswer: 0
  },
  {
    id: 92,
    question: "Calculate the MAASP with the following information:\n\nWell data:\nMD: 11500 ft.\nTVD: 10200 ft.\nCasing shoe MD: 8200 ft.\nCasing shoe TVD: 7400 ft.\nDrilling fluid density: 10 ppg.\nFormation strength gradient: 0.707 psi/ft.",
    options: [
      "381 psi",
      "400 psi",
      "350 psi",
      "420 psi"
    ],
    correctAnswer: 0
  },
  {
    id: 93,
    question: "The deepest casing shoe in a well is set at 5675 ft MD., 5125 FT TVD.\n\nIf the fluid density increased by 1.2 ppg, how will this affect MAASP.",
    options: [
      "It will be 320 psi higher.",
      "It will be 354 psi lower.",
      "It will be 320 psi lower.",
      "It will be 354 psi higher."
    ],
    correctAnswer: 2
  },
  {
    id: 94,
    question: "Well data:\n13 3/8\" casing is set at 4921 feet TVD.\nFormation strength at shoe: 3626 psi. (Determined by leak off test).\nCurrent fluid density: 10 ppg.\n\nWhat is the maximum allowable annulus surface pressure (MAASP)?",
    options: [
      "1067 psi.",
      "425 psi.",
      "3045 psi.",
      "1807 psi."
    ],
    correctAnswer: 0
  },
  {
    id: 95,
    question: "Calculate the MAMW using information below.\n\nWELL DATA:\nCasing shoe depth: 6350 ft TVD.\nLOT pressure: 1420 psi.\nDensity of drilling mud in hole: 9.8 ppg.",
    options: [
      "14.1 ppg",
      "13.5 ppg",
      "14.5 ppg",
      "13.0 ppg"
    ],
    correctAnswer: 0
  },
  {
    id: 96,
    question: "13 5/8\"- surface casing is set and cemented at 3126 feet TVD the cement is drilled out together with 15 feet of new hole using 10.2 ppg drilling fluid and a leak off pressure of 670 psi is measured.\n\nWhat is the maximum allowable annulus surface pressure with 11.4 ppg drilling fluid at 6500 feet TVD?",
    options: [
      "280 psi",
      "320 psi",
      "250 psi",
      "300 psi"
    ],
    correctAnswer: 0
  },
  // Kick Warning Signs Section
  {
    id: 97,
    question: "What should the driller do when kick warning signs are seen?",
    options: [
      "Be alert to shut the well in quickly.",
      "Shut the well in.",
      "Alert the tool pusher and request assistance.",
      "Check for flow."
    ],
    correctAnswer: 3
  },
  {
    id: 98,
    question: "While drilling a head through a faulted formation, the flow meter drops from 50% to 42%. What is the most likely cause of this?",
    options: [
      "A partial lost circulation has occurred.",
      "A kick has been swabbed on the last connection.",
      "There is a washout in the string.",
      "Total lost circulation has occurred."
    ],
    correctAnswer: 0
  },
  {
    id: 99,
    question: "During the trip out of the well, and with the bit 1200 ft from bottom, the hole failed to take the calculated volume of drilling fluid from the trip tank, there is no flow from the well. What is the next step that should be taken?",
    options: [
      "Pump remaining stands out of the hole.",
      "Flow check, if negative continue to pull out of the hole.",
      "Shut the well in and circulate hole clean.",
      "Flow check, if negative run back to bottom and monitor returns."
    ],
    correctAnswer: 3
  },
  {
    id: 100,
    question: "After pulling ten stands out of the hole, the fluid it takes to fill the hole from the tank is less than calculated on the trip sheet? What action is required?",
    options: [
      "Flow check, if there is no flow, continue to pull out of the hole to surface.",
      "Flow check, if there is no flow, displace a heavy slug into annulus and continue to pull out of hole.",
      "Flow check, if there is no flow, run back to bottom while monitoring returns.",
      "Pump the remaining stands out of the hole."
    ],
    correctAnswer: 2
  },
  {
    id: 101,
    question: "During a trip 15 stand of dry pipe have been pulled out, the volume of drilling fluid use to fill the hole was 8.2 bbl.\n\nWell data:\nWell depth: 5800 ft\nStand Length: 90 ft\nDrill pipe Capacity: 0.01782 bbl/ft\nDrill pipe metal displacement: 0.0082 bbl/ft\nDrilling mud density: 11.2 ppg\n\nSelect the correct action from the following list.",
    options: [
      "The volume is not corrected due to swabbing but as long as the well is stable continue to pull out.",
      "Continue to pull out since the situation seems to be under control.",
      "Start pumping high density drilling mud in to the annulus.",
      "An influx has been swabbed in, check for flow, if no flow, trip back to bottom while monitoring displaced volume and carefully then circulate bottom up."
    ],
    correctAnswer: 3
  },
  {
    id: 102,
    question: "If connection gas is detected, what action should be taken?",
    options: [
      "Flow check",
      "Directly shut in the well",
      "Ask the Supervisor."
    ],
    correctAnswer: 0
  },
  {
    id: 103,
    question: "After a round trip, the driller circulate bottom up. The mud logger noticed gases in the shale shaker area. What is the cause of this?",
    options: [
      "Trip gas",
      "Connection gas",
      "Background gas"
    ],
    correctAnswer: 0
  },
  {
    id: 104,
    question: "While drilling, gas levels increased in the return flow from 8% to 9%. Which type of gas is this?",
    options: [
      "Trip gas",
      "Connection gas",
      "Background gas"
    ],
    correctAnswer: 2
  },
  {
    id: 105,
    question: "What should be done if the shaker man / Derrick Man noticed an increase in the cutting size and the shaker is over flowing?",
    options: [
      "Contact the supervisor.",
      "Inform the driller to perform flow check. (as this is a warning sign)",
      "Open the Shaker bypass.",
      "Change screen."
    ],
    correctAnswer: 1
  },
  {
    id: 106,
    question: "While drilling, the cuttings returning to the shakers become bigger and splintered. What should you do?",
    options: [
      "Communicate the kick warning sign to the Supervisor.",
      "Communicate the situation to the Mud Engineer.",
      "Instruct the Derrickman to change the shaker screens.",
      "Instruct the Shaker Hand to by-pass the shale shakers."
    ],
    correctAnswer: 0
  },
  {
    id: 107,
    question: "While drilling, the shape of the cuttings on the shaker changes and there is significant increase in gas percentage; while there is no increase in mud pits. What should the supervisor should do with the driller?",
    options: [
      "Stop drilling and perform a flow check.",
      "Continue drilling.",
      "Increase Mud density."
    ],
    correctAnswer: 0
  },
  {
    id: 108,
    question: "What is the best practice from the well control point of view while RIH with casing?",
    options: [
      "Flow check every 10 joints.",
      "Calculate the trip sheet using closed end displacement.",
      "Monitor the closed end displacement returning on the active system.",
      "Use self-filing float valve, monitor that the open end displacement is returning on trip tank."
    ],
    correctAnswer: 3
  },
  {
    id: 109,
    question: "After connection and while circulating bottom up circulation, it was observed that the return flow increase. How do you explain this?",
    options: [
      "Blow out.",
      "Connection gas.",
      "Swabbed Kick."
    ],
    correctAnswer: 1
  },
  {
    id: 110,
    question: "While drilling along at steady rate, the derrick man asks the driller to reduce the pump rate so the shakers can handle an increase in cuttings in the mud returns.\n\nWhat should the driller do?",
    options: [
      "Stop pumping and flow check, if there is no flow, circulate bottom up at reduced rate so that shakers can handle the cuttings volume.",
      "Reduce the pump rate until the shakers can handle the capacity of cuttings in the mud returns.",
      "Stop the pumps and flow check, if there is no flow, continue at the same rate allowing the excess to bypass the shakers and get caught in the sand traps.",
      "Stop pumping and flow check, if there is no flow, continue using the original drilling parameters."
    ],
    correctAnswer: 3
  },
  {
    id: 111,
    question: "At bottoms up after a connection, the mud loggers report an increase in gas level, shortly after, the gas level returns to normal, what is the safest action for driller to take?",
    options: [
      "Increase weight on bit to compensate for increase in gas. Stop flow checking on connections.",
      "Carefully monitor for additional warning signs as formation pressure may be increasing.",
      "Increase the pump speed to control gas levels after a connection.",
      "Call the mud logger to confirm that their instruments have been calibrated within last week."
    ],
    correctAnswer: 1
  },
  {
    id: 112,
    question: "While drilling. The Driller reports to the supervisor that the cutting returning to the shakers are becoming bigger and more angular in shape. The mud logger also reports that there is a significant increase in background gas. What should the supervisor do?",
    options: [
      "Instruct the mud Engineer to increase the drilling fluid density in the active system.",
      "Instruct the Driller to operate the vacuum degasser.",
      "Instruct the Driller to reduce the ROP to reduce background gas levels.",
      "Instruct the Driller to stop drilling. And flow checks the well."
    ],
    correctAnswer: 3
  },
  {
    id: 113,
    question: "While drilling, the driller reports to the supervisor that the cutting returning to the shakers become splintered. What should the supervisor do?",
    options: [
      "This may be a kick warning sign, so communicate with the mud loggers to assess if there are other warning signs.",
      "This is normal, request a change of shaker screens.",
      "This is a positive kick indicator, so instruct the driller to shut in the well.",
      "This is normal, request for the return flow to by-pass the shale shakers."
    ],
    correctAnswer: 0
  },
  {
    id: 114,
    question: "There is a sudden increase, and then decrease in the drilling fluid measured gas percentage at bottom up from a connection. What should you instruct the driller to do?",
    options: [
      "Call the mud loggers to confirm that their instruments have been calibrated within the last week.",
      "Increase the WOB to compensate for the increase in gas, and stop flow checking on connections.",
      "Carefully monitor the ROP and shut in the well if ROP increases or decreases.",
      "Carefully monitor for additional warning signs as formation pressure may be increasing."
    ],
    correctAnswer: 3
  },
  {
    id: 115,
    question: "The measured gas percentage in the drilling fluid increased from 8% to 9% over the past three days. What should you instruct the driller to do?",
    options: [
      "Call the mud loggers to confirm that their instruments have been calibrated within the last week.",
      "Circulate bottoms up before making connections and monitor for an increase in the gas percentage.",
      "Increase WOB to compensate for the increase in gas and stop flow checking on connections.",
      "Carefully monitor for additional warning signs, as formation pressure maybe increasing."
    ],
    correctAnswer: 3
  },
  {
    id: 116,
    question: "During well operations the drilling fluid becomes gas-cut flow check results are negative, what is the impact of the gas cut drilling fluid on the operation?",
    options: [
      "This is normal and will affect ongoing operations.",
      "This is a kick warning sign, run the vacuum degasser.",
      "This is a positive kick indicator and the well must be flow checked.",
      "This is a positive kick indicator and the well must be shut in."
    ],
    correctAnswer: 1
  },
  {
    id: 117,
    question: "Calculate the volume required to fill the hole when pulling one stand wet.\n\nDrill pipe capacity: 0.01773 bbl/ft\nDrill collar capacity: 0.0087 bbl/ft\nDrill pipe metal displacement: 0.0075 bbl/ft\nDrill collar metal displacement: 0.0370 bbl/ft\nStand length: 93 feet",
    options: [
      "0.70 bbl",
      "0.85 bbl",
      "0.60 bbl",
      "0.75 bbl"
    ],
    correctAnswer: 0
  },
  {
    id: 118,
    question: "Calculate the volume required to fill the hole when pulling one stand dry.\n\nDrill pipe capacity: 0.01773 bbl/ft\nDrill collar capacity: 0.0087 bbl/ft\nDrill pipe metal displacement: 0.0075 bbl/ft\nDrill collar metal displacement: 0.0370 bbl/ft\nStand length: 93 feet",
    options: [
      "2.35 bbl",
      "2.50 bbl",
      "2.25 bbl",
      "2.40 bbl"
    ],
    correctAnswer: 0
  },
  {
    id: 119,
    question: "On what principle is the trip tank based?",
    options: [
      "Displacement of oil-based fluids.",
      "Displacement of water-based fluids.",
      "Displacement of any fluid."
    ],
    correctAnswer: 2
  },
  {
    id: 120,
    question: "What are the benefits of tripping the drill string with a continuous circulating system?",
    options: [
      "Continuous circulation can prevent swab and surge and potential wellbore stability issues.",
      "Continuous circulation can prevent ECD fluctuation and potential wellbore stability issues.",
      "Continuous circulation can improve ROP and prevent potential wellbore stability issues.",
      "Continuous circulation can prevent swab and surge as well as reducing the chances of downhole tool failure."
    ],
    correctAnswer: 0
  },
  {
    id: 121,
    question: "A trip margin was added before tripping. What is the reason for having the pumps shut down regularly when pulling out of the hole?",
    options: [
      "To rest the pumps and check for flow.",
      "To give you time to check the pipe tally and hole fill volume.",
      "To give you time to safety grease the travelling block from a riding belt.",
      "To provide the drill crew with training if there is a kick while tripping."
    ],
    correctAnswer: 0
  },
  {
    id: 122,
    question: "Which action helps to prevent swabbing?",
    options: [
      "Installing a Non Return Valve (NRV) in the drill string.",
      "Monitoring trip tank levels.",
      "Pumping a heavy slug before pulling out of the hole.",
      "Pumping out of the hole."
    ],
    correctAnswer: 3
  },
  {
    id: 123,
    question: "After connection the pit level didn't return to what it was before the connection. What does this indicate?",
    options: [
      "Air inside the pipe",
      "The derrick left the degasser working while connection",
      "The annulus was loaded with cuttings",
      "Small gas influx"
    ],
    correctAnswer: 3
  },
  {
    id: 124,
    question: "While POOH, non shearable tool is across BOP. Which action should the driller take? (TWO ANSWERS)",
    options: [
      "Flow check",
      "Check with crew that we have right cross over as per these tools.",
      "Inform the crew that we have non shearable tool, so do it fast as possible",
      "Secure the BOP and function test shear ram"
    ],
    correctAnswer: 0 // Note: Multi-select - a, b are correct
  },
  {
    id: 125,
    question: "During well operations, the drilling fluid becomes gas-cut. What is the impact on the operation?",
    options: [
      "This is a kick warning sign, and using the vacuum degasser may complicate pit volume measurements",
      "This is a warning sign, and the well must be flow checked",
      "This is a positive kick indicator, the well must be shut in before notifying the supervisor, and well pressures must be recorded",
      "This is normal, and will not affect ongoing operations"
    ],
    correctAnswer: 0
  },
  {
    id: 126,
    question: "During well operations, the drilling fluid becomes gas-cut. What action should be taken?",
    options: [
      "Divert the fluid to the waste mud pit, and continue the operation.",
      "Notify the Supervisor and turn on the vacuum degasser.",
      "Shut in the well, notify the Supervisor and record the well pressures.",
      "Stop operations, flow check the well, and notify the Supervisor."
    ],
    correctAnswer: 3
  },
  {
    id: 127,
    question: "What is the positive indicator that the well is flowing?",
    options: [
      "A decrease in pump pressure",
      "An increase in flow returns",
      "An increase in gas-cut drilling fluid",
      "An increase in torque"
    ],
    correctAnswer: 1
  },
  {
    id: 128,
    question: "While drilling which action can help you detect a kick early?",
    options: [
      "Reduce the range of PVT (pit volume totalizer) high and low alarm settings.",
      "Continue operating the solid control equipment during connections.",
      "Allow drilling fluid losses by overflowing the shakers.",
      "Allow mud system transfers from the reserve pits while drilling a head."
    ],
    correctAnswer: 0
  },
  {
    id: 129,
    question: "The flow sensor shows a total loss of returns and the mud level cannot be seen in the annulus. What immediate action should be taken?",
    options: [
      "Shut the well in and pump lost circulation material.",
      "Fill the annulus with water (or lightest mud available) and record volume.",
      "Pump at reduced rate adding lost circulation material.",
      "Continue drilling ahead cautiously."
    ],
    correctAnswer: 1
  },
  {
    id: 130,
    question: "What should the Driller do after seeing a drilling break?",
    options: [
      "Circulate bottoms up.",
      "Flow check the well.",
      "Increase the pump speed.",
      "Reduce the weight on the bit."
    ],
    correctAnswer: 1
  },
  {
    id: 131,
    question: "What should the Driller do when kick warning signs are seen?",
    options: [
      "Alert the Tool Pusher and request assistance.",
      "Be alert to shut the well in quickly.",
      "Check for flow.",
      "Shut the well in."
    ],
    correctAnswer: 2
  },
  {
    id: 132,
    question: "Does a kick always occur after a total loss of circulation?",
    options: [
      "No, it depends on the mud level in the annulus and the formation pressure.",
      "Yes, losses will always occur above any potential kick zone.",
      "No, it depends on the reduction in drill string weight."
    ],
    correctAnswer: 0
  },
  {
    id: 133,
    question: "How will bottom hole pressure be affected by gas cut mud while drilling?",
    options: [
      "There will be a large drop.",
      "There will be no change.",
      "There will be a small drop."
    ],
    correctAnswer: 2
  },
  {
    id: 134,
    question: "Gas cut mud may reduce the bottom hole pressure enough to cause a well kick; when is bottom hole pressure reduced most?",
    options: [
      "When the gas is at the bottom.",
      "When the gas is near the surface.",
      "When the gas is halfway up the well bore."
    ],
    correctAnswer: 1
  },
  {
    id: 135,
    question: "Which of the following is not an indicator of a kick whilst drilling?",
    options: [
      "Pit gain.",
      "Decrease in pump strokes.",
      "Decrease in pump pressure.",
      "Flow rate increase."
    ],
    correctAnswer: 1
  },
  {
    id: 136,
    question: "While drilling, which of the following situations make kick detection with a P.V.T. (Pit Volume Totalizer) more difficult for the driller?",
    options: [
      "By-passing the solids control equipment pits.",
      "Reducing the range of P.V.T. high and low alarm settings.",
      "Allowing mud losses by overflowing the shakers.",
      "Keeping active mud system transfers to a minimum when drilling ahead."
    ],
    correctAnswer: 2
  },
  {
    id: 137,
    question: "While pulling out of the hole the weight indicator fluctuates due to tight spots what will be its effect?",
    options: [
      "Surge pressure",
      "Losses",
      "Swabbed kick"
    ],
    correctAnswer: 2
  },
  {
    id: 138,
    question: "When pulling out of hole swabbing can be detected by comparing calculated volume with the actual volume in the trip tank. How is swabbing detected?",
    options: [
      "When the hole takes a less volume than calculated.",
      "When the hole takes a higher volume than calculated.",
      "When the hole takes the same volume as calculated."
    ],
    correctAnswer: 0
  },
  {
    id: 139,
    question: "You plan to trip out of the well to change the bit.\n\nYou decided to pull 10 stands and then run back to bottom (check trip) and circulate bottom up.\n\nWhat is the main reason for doing a check trip?",
    options: [
      "To test that drill crew is ready for tripping.",
      "So that pipe can be pulled to surface at faster rate and minimize the risk of swabbing.",
      "To verify that primary well control can be maintained when pulling pipe out of the well.",
      "To allow the mud at the bit to cool down before pulling out of the hole."
    ],
    correctAnswer: 2
  },
  {
    id: 140,
    question: "After pulling ten stands out of the hole, the fluid it takes to fill the hole is less than calculated on the trip sheet.\n\nWhat action is required?",
    options: [
      "Flow check, if there is no flow, continue to pull out of the hole to surface.",
      "Flow check, if there is no flow, run back to bottom while monitoring returns.",
      "Pump the remaining stands out of the hole.",
      "Flow check, if there is no flow, displace a heavy slug into annulus and continue to pull out of hole."
    ],
    correctAnswer: 1
  },
  {
    id: 141,
    question: "You are running casing with a self- filling float assembly across a pressured formation. At the casing shoe, you convert to float, how do you confirm that the self-fill assembly has converted correctly?",
    options: [
      "Confirm that the return from the well equal the closed end volume of the casing that was run in the hole.",
      "Check the hook load increase by the buoyed weight of steel run in the hole.",
      "Confirm that the return from the well equal the steel displacement.",
      "Reverse circulate and measure the number of strokes pumped before mud flow out of the casing."
    ],
    correctAnswer: 0
  },
  {
    id: 142,
    question: "Using the trip sheet below, what action should the supervisor take?\n\nNote: The pipe will be pulled dry. DP Capacity = 0.0178 bbl/ft\nDP Displacement = 0.0068 bbl/ft",
    options: [
      "As the BHA is still below the casing shoe, stop tripping, flow check the well.",
      "As the trip is going as expected, continue tripping.",
      "As the driller should have flow checked the well before filling the trip tank, stop tripping.",
      "As the calculated displacement are incorrect, flow check and circulate the well."
    ],
    correctAnswer: 0
  },
  {
    id: 143,
    question: "Using the trip sheet below, what action should the supervisor take?\n\nNote: The pipe will be pulled dry. DP Capacity = 0.0177 bbl/ft\nDP Displacement = 0.0069 bbl/ft",
    options: [
      "Stop tripping, flow check the well. If flow is confirmed, run back to bottom.",
      "Stop tripping, flow check the well. If there is no flow, circulate the well.",
      "Stop tripping, flow check the well. If there is no flow, run back to bottom.",
      "Stop tripping, flow check the well. If there is no flow, continue to POOH."
    ],
    correctAnswer: 2
  },
  {
    id: 144,
    question: "What well control problem can happen when using self- filling floats?",
    options: [
      "Fluid in the annulus is less likely to maintain hydrostatic head when u tubing.",
      "If the self-filling float fails, it can completely plug the casing string and annulus.",
      "If float fails to convert it may result in uncontrolled flow in the casing string.",
      "By running casing more quickly, you reduce the ability to monitor returns."
    ],
    correctAnswer: 2
  },
  {
    id: 145,
    question: "Long series electric logs will be run in a well with small overbalance. What is the safest action to take?",
    options: [
      "Reduce the number of electric logs to be run.",
      "Replace a set of shear/blind rams with a set of pipe rams.",
      "Install and pressure test the appropriate riser/lubricator assembly.",
      "Run the logs, as no additional equipment is required."
    ],
    correctAnswer: 2
  },
  {
    id: 146,
    question: "What action helps to prevent swabbing?",
    options: [
      "Pump out of the hole while tripping out of the hole.",
      "Pumping a heavy slug before pulling out of the hole.",
      "Installing a non-return valve (NRV) in the drill string.",
      "Monitor trip tank levels."
    ],
    correctAnswer: 0
  },
  {
    id: 147,
    question: "You are running casing using a conventional double float system when you start to experience minor losses. What should you do?",
    options: [
      "Continue running casing at a reduced speed while carefully monitoring returns.",
      "Increase casing running speed and start the cement job as quickly as possible.",
      "Reduce the drilling fluid density used to fill the casing until losses stop.",
      "Stop running casing and pump lost circulation materials immediately."
    ],
    correctAnswer: 0
  },
  {
    id: 148,
    question: "What can you do to reduce the risk of surging before running casing?",
    options: [
      "Circulate and condition drilling fluid in the well.",
      "Calculate drilling fluid displacement volumes.",
      "Keep drilling fluid static for 24 hours before running casing.",
      "Fill the trip tank with drilling fluid from the active system."
    ],
    correctAnswer: 0
  },
  {
    id: 149,
    question: "You are preparing to pull out to surface after drilling. The well is stable. Why is it important to minimize the number of stands pulled before stopping to do a flow check?",
    options: [
      "To minimize possible damage to the casing.",
      "To ensure no influx has been swabbed into the well.",
      "To reduce the circulation pressures.",
      "To ensure the trip tank functions correctly."
    ],
    correctAnswer: 1
  },
  {
    id: 150,
    question: "Drilling was stopped before entering a depleted sand formation where severe losses were expected. What actions should be taken before drilling can continue?",
    options: [
      "Displace the well to the lowest possible drilling fluid density. Prepare a lost circulation material (LCM) pill and displace it into the annulus.",
      "Circulate bottoms-up to condition the drilling fluid. Prepare and pump lost circulation material (LCM) to the bit.",
      "Displace the well to kill-density drilling fluid. Ensure both pumps are working at maximum SPM.",
      "Displace the well to water. Increase the rotary speed to ensure the highest penetration rate to drill through the depleted zone."
    ],
    correctAnswer: 1
  },
  {
    id: 151,
    question: "During normal drilling operations 20 bbl of light fluid is pumped into the string, followed by original fluid. With the light fluid inside the drillpipe, the driller shuts down the pumps to monitor the well. What happens to the bottomhole pressure (BHP)?",
    options: [
      "The BHP will decrease, and there will be no back pressure showing on the drillpipe pressure gauge.",
      "The BHP pressure will remain the same, but a back pressure will show on the drillpipe pressure gauge.",
      "The BHP pressure will increase, and the back pressure will show on the drillpipe pressure gauge."
    ],
    correctAnswer: 1
  },
  {
    id: 152,
    question: "What are the warning signs of increasing formation pressure if RPM, weight on bit (WOB) and pump rate are held constant? Choose three answers",
    options: [
      "A drop in active tank level.",
      "An increase in trip tank level.",
      "A change in the shape of the cuttings at the shakers.",
      "Varying penetration rate.",
      "A decrease in flow line temperatures.",
      "An increase in pump pressure.",
      "Increased connection gas in the returns."
    ],
    correctAnswer: 2 // Note: Multi-select - c, d, g are correct
  },
  {
    id: 153,
    question: "During a cementing operation, returns indicate that the well is flowing. What should you do?",
    options: [
      "Increase the pump rate. Ensure that cement slurry density is as recommended in the cementing programme. Continue operations.",
      "Stop operations. Shut in the well. Monitor and record surface pressures.",
      "Disconnect the cement line. Connect the topdrive or kelly. Inform the drilling supervisor.",
      "Inform the drilling supervisor. Reduce the pump rate. Increase the cement density."
    ],
    correctAnswer: 1
  },
  {
    id: 154,
    question: "When tripping out of the hole using a trip tank, which factors could indicate a possible influx to the driller? Choose two answers.",
    options: [
      "The trip tank level falls less than expected for each pulled stand.",
      "When pulling pipe, the flow meter in the flowline shows a decrease in flow.",
      "The hook load decreases as each stand is pulled.",
      "The trip tank level falls more than expected for each pulled stand.",
      "With no pipe movement, the trip tank level increases."
    ],
    correctAnswer: 0 // Note: Multi-select - a, e are correct
  },
  {
    id: 155,
    question: "After a round trip at 9854 (9100) ft with 10.3 ppg drilling fluid, circulation is started at a constant pump rate and there is an increase in returns. The well is shut in with zero pressure on the drill pipe gauge and 200 psi on the casing gauge.\n\nThere is no float in the drill string. What kill mud density will be required?",
    options: [
      "10.7",
      "There is no way of knowing.",
      "11.0 ppg",
      "10.3"
    ],
    correctAnswer: 3
  },
  {
    id: 156,
    question: "A vertical well is drilled to a depth of 8000 ft. Overbalance: 170 psi Mud gradient: 0.67 psi/ft. Casing capacity: 0.157 bbl/ft. Drill pipe metal displacement: 0.008 bbl/ft. How many complete stands can the driller pull dry, without filling the hole, before the overbalance is lost? (One stand equals 90 feet).",
    options: [
      "52 stands.",
      "53 stands.",
      "55 stands.",
      "54 stands"
    ],
    correctAnswer: 0
  },
  {
    id: 157,
    question: "A vertical well is drilled to a depth of 8000 ft.\n\nOverbalance: 160 psi\nMud gradient: 0.73 psi/ft.\nCasing capacity: 0.157 bbl./ft.\nDrill pipe metal displacement: 0.008 bbl./ft.\n\nHow many complete stands can the driller pull dry, without filling the hole, before the overbalance is lost? (One stand equals 90 feet).",
    options: [
      "45 stands.",
      "46 stands.",
      "47 stands.",
      "48 stands."
    ],
    correctAnswer: 1
  },
  {
    id: 158,
    question: "Calculate the volume of drilling fluid required to fill the hole per stand when pulled \"wet\". With no drilling fluid returns to the well.\n\nWell data:\nDrill pipe capacity: 0.0178 bbl/feet.\nDrill pipe metal displacement: 0.0082 bbl./feet.\nAverage stand length: 93 feet.",
    options: [
      "0.76",
      "2.42",
      "1.65",
      "9.28"
    ],
    correctAnswer: 1
  },
  {
    id: 159,
    question: "During a trip, 15 stands of dry pipe are pulled out. The drilling fluid volume used to keep the hole full was 8.2 bbl. Using the following data, what is the correct action to take if there is no flow from the well?\n\nWell data:\nWell depth: 5800 ft.\nStand length: 90 ft.\nDP cap.: 0.0178 bbl./ft.\nDP metal displacement: 0.0082 bbl./ft.\nDrilling fluid density: 11.2 ppg.",
    options: [
      "Start pumping high density drilling fluid into the annulus.",
      "Trip back to bottom while monitoring the displaced volume. Then circular bottom up.",
      "Pump a heavy weight slug and continue to pull out of hole.",
      "Continue to pull out as situation is under control."
    ],
    correctAnswer: 1
  },
  {
    id: 160,
    question: "You are about to run casing on surface stack rig. You will use self-filling float until the shoe reaches its final depth which is 20 ft. from bottom. Using the following data, calculate the total volume of drilling fluid that will be displaced from the well.\n\nWell MD: 11575 ft\nWell TVD: 10383 ft\nCasing OD: 9.625\nCasing cap.: 0.0787 bbl/ft\nCasing metal displ.: 0.01129 bbl/ft\nCasing closed end: 0.08999 bbl/ft",
    options: [
      "909.4 bbl",
      "910.9 bbl",
      "130.5 bbl",
      "130.7 bbl."
    ],
    correctAnswer: 2
  },
  {
    id: 161,
    question: "Using the following data below, running casing with tested float valves, calculate the total fluid displacement when running casing to final depth of 20 feet from bottom (filling the casing from the trip tank).\n\nWell MD: 11575 ft\nWell TVD: 10383 ft\nCasing OD: 9.625\nCasing cap.: 0.0787 bbl/ft\nCasing metal displ.: 0.01129 bbl/ft\nCasing closed end dis.: 0.08999 bbl/ft",
    options: [
      "130.5 bbl",
      "130.7 bbl",
      "909.4 bbl",
      "910.9 bbl"
    ],
    correctAnswer: 0
  },
  {
    id: 162,
    question: "You are about to run casing on a surface stack rig. With returns going to the trip tank. You will use a conventional double float system until the shoe reaches its final depth (20 ft from bottom) use the data below to calculate the total volume of drilling fluid you need to keep the casing full:\n\nWell MD: 11575 FT.\nWell TVD: 10383 ft.\nCasing OD: 9.625 in.\nCasing capacity: 0.0787 bbl./ft.\nCasing displacement: 0.01129 bbl./ft.",
    options: [
      "932.6 bbl.",
      "909.4 bbl.",
      "910.9 bbl.",
      "1039.8 bbl"
    ],
    correctAnswer: 1
  }
];

export function getIWCFDrillingQuestions(): IWCFDrillingQuestion[] {
  return iwcfDrillingQuestions;
}
