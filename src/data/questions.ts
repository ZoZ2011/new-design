import coiledTubingStack from "@/assets/coiled-tubing-stack.png";
import snubbingStack from "@/assets/snubbing-stack.png";
import brineWeightTableQ77 from "@/assets/brine-weight-table-q77.png";
import brineWeightTableQ78 from "@/assets/brine-weight-table-q78.png";
import brineWeightTableQ79 from "@/assets/brine-weight-table-q79.png";
import brineWeightTableQ80 from "@/assets/brine-weight-table-q80.png";
import wellboreSchematicQ97 from "@/assets/wellbore-schematic-q97.png";
import wellboreSchematicQ21 from "@/assets/wellbore-schematic-q21.png";
import brineWeightTableQ60 from "@/assets/brine-weight-table-q60.png";
import brineWeightTableQ27MT2 from "@/assets/brine-weight-table-q27-mt2.png";
import coiledTubingStackQ35 from "@/assets/coiled-tubing-stack-q35.png";
import snubbingStackQ17 from "@/assets/snubbing-stack-q17.png";
import brineWeightTableQ51MT1 from "@/assets/brine-weight-table-q51-mt1.png";
import { iwcfDrillingQuestions } from "./iwcfDrillingQuestions";

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  image?: string;
}

export const coiledTubingQuestions: Question[] = [
  {
    id: 1,
    question: "On a diesel power pack unit, the Emergency Shut-Down (ESD) switch does what to the unit?",
    options: ["Shuts off air", "Shuts off fuel", "Shuts off hydraulics", "Both A and B"],
    correctAnswer: 3
  },
  {
    id: 2,
    question: "Utilizing gripper block force, a hydraulic style single gripper block size can be used on multiple sized coiled tubing.",
    options: ["True", "False"],
    correctAnswer: 0
  },
  {
    id: 3,
    question: "Which items have the largest impact on coiled tubing injector gripping forces above the stripper?",
    options: [
      "Reel tension, pipe weight, tubing OD, and wellbore pressures",
      "Pipe weight, tubing OD, buoyancy, and wellbore pressures",
      "Wellbore pressures, rig-up height, and length of string",
      "Stripper pressure, length of string, and buoyancy"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "What prevents flow through the coiled tubing when not pumping?",
    options: ["Slip ram", "Pipe ram", "Bottomhole assembly check valves", "Both B and C"],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "Which condition would dictate the need for redundant float/downhole check valves?",
    options: [
      "Pressure testing tubing",
      "When pumping at a high rate for extended periods",
      "When pumping at a low rate for extended periods",
      "Satisfying the two barrier rule"
    ],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "When may a flow check assembly be used in a coiled tubing bottomhole assembly?",
    options: [
      "When taking returns through the flow cross installed in the stack",
      "When running concentric coiled tubing",
      "When reverse circulating",
      "All the above"
    ],
    correctAnswer: 0
  },
  {
    id: 7,
    question: "With a flow check assembly removed; an additional shear-blind ram is not required for coiled tubing operations.",
    options: ["True", "False"],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "During a well clean out, the well begins to flow, what tool at the end of the workstring would prevent flow up the string?",
    options: ["Dart valve", "Dual Stripper element", "Quad Well Control Stack", "All the above"],
    correctAnswer: 0
  },
  {
    id: 9,
    question: "During a coiled tubing or snubbing operation, why would redundant float/downhole check valves be used?",
    options: [
      "In case one valve leaks",
      "Increasing BHA length",
      "Satisfying the two-barrier rule",
      "Pumping at a low rate for extended periods"
    ],
    correctAnswer: 0
  },
  {
    id: 10,
    question: "When would dual strippers be considered when rigging-up a coiled tubing unit?",
    options: [
      "Long BHA length",
      "In low pressure environments",
      "In corrosive environments",
      "When using an internally tapered work string"
    ],
    correctAnswer: 2
  },
  {
    id: 11,
    question: "What factor can impact the wear rate of the stripper element?",
    options: [
      "Coiled tubing circulation rate",
      "Differential pressure across the stripping element",
      "Outside air temperature",
      "BHA length"
    ],
    correctAnswer: 1
  },
  {
    id: 12,
    question: "While running in the hole with coiled tubing, the stripper and check valve are operating normally. What function does the Quad Well Control Stack serve in this condition?",
    options: ["Primary barrier", "Secondary barrier", "Emergency closure"],
    correctAnswer: 1
  },
  {
    id: 13,
    question: "For coiled tubing operations, which of the following is NOT true concerning slip rams?",
    options: [
      "Used to support the tubing weight when re-aligning or shearing pipe",
      "Their teeth should accommodate both light pipe and heavy pipe situations",
      "Will damage the coiled tubing when operated",
      "Are pressure sealing"
    ],
    correctAnswer: 3
  },
  {
    id: 14,
    question: "Potential risks of having a lubricator or spool between the coiled tubing Well Control Stack and the stripper include:",
    options: [
      "Potential risk of working at heights",
      "Leak Path Exposure",
      "Reduced Visual and Physical Access",
      "All the above"
    ],
    correctAnswer: 3
  },
  {
    id: 15,
    question: "While running in the hole with coiled tubing, the stripper and check valve are operating normally. What function does the Quad Well Control Stack serve in this condition?",
    options: ["Pressure Control Device", "Barrier"],
    correctAnswer: 1
  },
  {
    id: 16,
    question: "Identify the location of the kill port for a Coiled Tubing Well Control Stack.",
    options: ["A", "B", "C", "D"],
    correctAnswer: 2,
    image: coiledTubingStack
  },
  {
    id: 17,
    question: "What is a limitation of coiled tubing Well Control Stack when used as a secondary barrier?",
    options: [
      "Cannot move pipe",
      "Possible burst of coiled tubing",
      "Proper connection to the wellhead",
      "Can move pipe"
    ],
    correctAnswer: 0
  },
  {
    id: 18,
    question: "In a coiled tubing operation, what is the proper lubricator length?",
    options: [
      "4 to 6 feet",
      "10 to 12 feet",
      "Long enough to accommodate the maximum length of BHA to be run",
      "Short enough to prevent lubricator buckling"
    ],
    correctAnswer: 2
  },
  {
    id: 19,
    question: "In an H2S well, an additional shear-blind ram is not required for coiled tubing operations.",
    options: ["True", "False"],
    correctAnswer: 1
  },
  {
    id: 20,
    question: "What is NOT a function of shear-blind rams?",
    options: [
      "Seal on pipe without damaging pipe",
      "Seal on open hole",
      "Shears pipe",
      "Test casing"
    ],
    correctAnswer: 0
  },
  {
    id: 21,
    question: "For any well capable of unassisted flow, the required valves between the coiled tubing Well Control Stack and pump, according to API RP 16ST, include:",
    options: [
      "Only one (1) full open valve is required",
      "Two (2) full open valves with a flow check device",
      "Two (2) full open valves with manual operators",
      "Two (2) full open valves with remote operators"
    ],
    correctAnswer: 1
  },
  {
    id: 22,
    question: "When on or off bottom, what is the best action to be taken when there is buckled coiled tubing between injector and stripper assembly?",
    options: [
      "Pump down coiled tubing",
      "Pull coiled tubing out of hole",
      "Check for flow and leaks",
      "Run coiled tubing in the hole"
    ],
    correctAnswer: 2
  },
  {
    id: 23,
    question: "While circulating on a live well with coiled tubing, the stripper element has failed and needs to be replaced. The quad ram BOPs have been closed. Which of the following is an acceptable method to check if the BOP rams are sealing?",
    options: [
      "After bleeding off the pressure above the BOPs, keep the bleed-off valve open and observe for returns",
      "After bleeding off the lubricator, verify there is no build-up of pressure",
      "After bleeding off the pressure above the BOPs and if it is safe to do so, perform a visual check above the ram BOPs",
      "Both A and B"
    ],
    correctAnswer: 3
  },
  {
    id: 24,
    question: "While near surface, there is a slight leak in the coiled tubing between the tubing guide arch and the reel. Which of the following actions can be taken?",
    options: [
      "Continue out of the hole",
      "Run coiled tubing leak in below stripper and pipe rams and assess the situation",
      "Shear and drop coiled tubing in the hole"
    ],
    correctAnswer: 1
  },
  {
    id: 25,
    question: "When on or off bottom, what action is to be taken when there is buckled coiled tubing between injector and stripper assembly?",
    options: [
      "Prepare to kill the well",
      "Shear tubing and seal wellbore",
      "Strip out of the hole",
      "Increase injector head force"
    ],
    correctAnswer: 0
  },
  {
    id: 26,
    question: "While coiled tubing is in the well, a general muster alarm sounds. Put the following steps in the proper sequence.\n1. Shut down the pump\n2. Report to muster station\n3. Close pipe rams using accumulator system\n4. Stop coiled tubing movement",
    options: ["4, 1, 3, 2", "1, 3, 4, 2", "1, 4, 3, 2", "2, 4, 3, 1"],
    correctAnswer: 0
  },
  {
    id: 27,
    question: "What is a consideration of tubing ratings?",
    options: ["Tensile", "Burst", "Collapse", "All the above"],
    correctAnswer: 3
  },
  {
    id: 28,
    question: "Multiple cycles across the tubing guide arch will reduce the strength of the coiled tubing.",
    options: ["True", "False"],
    correctAnswer: 0
  },
  {
    id: 29,
    question: "When could tubing buckling be encountered?",
    options: [
      "When running any tubular under compression with sufficient supported length",
      "When snubbing into highly deviated wells",
      "When well is full of light fluid",
      "When decreasing injector head force"
    ],
    correctAnswer: 1
  },
  {
    id: 30,
    question: "Running coiled tubing while pumping at high pressures _______ the number of bend cycles before the coiled tubing reaches failure.",
    options: ["Increases", "Decreases", "Does not affect"],
    correctAnswer: 1
  },
  {
    id: 31,
    question: "What is/are the minimum coiled tubing condition(s) that the supervisor is responsible for verifying?",
    options: [
      "Manufacturer's Metallurgical Test Records",
      "Historical Fatigue Tracking or Lifecycle Analytics",
      "Verify well control response plan with coiled tubing operator",
      "All the above"
    ],
    correctAnswer: 2
  },
  {
    id: 32,
    question: "What can affect the burst pressure rating of coiled tubing?",
    options: [
      "Pipe cycle fatigue",
      "Wall thickness (corrosion/erosion)",
      "Pipe Metallurgy",
      "All the above"
    ],
    correctAnswer: 3
  },
  {
    id: 33,
    question: "What does NOT affect the collapse pressure rating of coiled tubing?",
    options: [
      "Decrease in thickness",
      "Tension loads",
      "Perforated casing",
      "Percentage of ovality is 7 %"
    ],
    correctAnswer: 2
  },
  {
    id: 34,
    question: "What can affect the collapse pressure rating of coiled tubing?",
    options: [
      "Corrosion/Erosion",
      "External Pressure Conditions",
      "Axial Loads and Combined Stress",
      "All the above"
    ],
    correctAnswer: 3
  },
  {
    id: 35,
    question: "What affects the collapse pressure rating of coiled tubing?",
    options: [
      "Tension loads",
      "Amount of Corrosion/Erosion",
      "Wall thickness",
      "All of the above"
    ],
    correctAnswer: 1
  },
  {
    id: 36,
    question: "What condition causes collapse of coiled tubing string?",
    options: [
      "High external differential pressure",
      "High internal pressure",
      "All the above"
    ],
    correctAnswer: 0
  },
  {
    id: 37,
    question: "As coiled tubing ovality increases, what happens to collapse rating?",
    options: ["It does not change", "It increases", "It decreases"],
    correctAnswer: 2
  },
  {
    id: 38,
    question: "Which of the following is most true concerning ovality of coiled tubing?",
    options: [
      "Ovality issues are very rare with coiled tubing because there are no connections in the string",
      "Can significantly decrease collapse pressure rating",
      "Can significantly increase collapse pressure rating"
    ],
    correctAnswer: 1
  },
  {
    id: 39,
    question: "What is a consequence of exceeding the tubing tensile strength due to frictional forces when pulling pipe out of the hole?",
    options: [
      "Incorrect pipe tally",
      "Loss of circulation",
      "Reduction in fluid weight",
      "Necking down"
    ],
    correctAnswer: 3
  },
  {
    id: 40,
    question: "When running internally tapered coiled tubing string, gripper blocks need to be changed.",
    options: ["True", "False"],
    correctAnswer: 1
  },
  {
    id: 41,
    question: "If a dual stripper is utilized in a coiled tubing operation, gripper block force can be reduced.",
    options: ["True", "False"],
    correctAnswer: 1
  },
  {
    id: 42,
    question: "Which item is used to calculate coiled tubing forces?",
    options: [
      "Wall thickness and grade",
      "Tensile and compression strength of the coiled tubing",
      "Fluid density and weight of coiled tubing",
      "All the above"
    ],
    correctAnswer: 3
  },
  {
    id: 43,
    question: "What does NOT affect the burst pressure rating of coiled tubing?",
    options: [
      "Pipe cycle fatigue",
      "Wall thickness (corrosion/erosion)",
      "Running speed",
      "Pipe Metallurgy"
    ],
    correctAnswer: 2
  }
];

export const snubbingQuestions: Question[] = [
  {
    id: 1,
    question: "What could be included as an internal snubbing barrier?",
    options: ["Fluid weight", "Annular", "Stripper ram", "Stab-in/safety valve"],
    correctAnswer: 3
  },
  {
    id: 2,
    question: "Which of the following can be used as an internal pressure control device in snubbing operations?",
    options: [
      "Trip tank",
      "Back pressure valve",
      "Upper and lower stripper rams",
      "Safety ram"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What is considered an internal snubbing barrier?",
    options: ["Fluid weight", "Back pressure valves", "Safety ram", "Annular"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "During a coiled tubing or snubbing operation, why would redundant float/downhole check valves be used?",
    options: [
      "In case one valve leaks",
      "Increasing BHA length",
      "Satisfying the two-barrier rule",
      "Pumping at a low rate for extended periods"
    ],
    correctAnswer: 0
  },
  {
    id: 5,
    question: "What is the limitation of testing the check valve in the BHA?",
    options: [
      "Restricts reverse circulation",
      "Flow limitations",
      "The ability to only test one flapper"
    ],
    correctAnswer: 2
  },
  {
    id: 6,
    question: "Which of the following can be used as a pressure control device in snubbing operations?",
    options: [
      "Slip ram",
      "Mud gas separator",
      "Lower master valve",
      "Upper and lower stripper rams"
    ],
    correctAnswer: 3
  },
  {
    id: 7,
    question: "What could be Included as an external pressure control device?",
    options: [
      "Stab-in/safety valve",
      "Back pressure valve",
      "Stripper ram"
    ],
    correctAnswer: 2
  },
  {
    id: 8,
    question: "What is the purpose of stripping ram in snubbing operations?",
    options: [
      "A dynamic sealing ram that allows movement of pipe into or out of the well sealing on a range of pipe sizes",
      "A dynamic sealing ram that allows movement of pipe into or out of the well under pressure",
      "A static sealing ram that allows movement of pipe into or out of the well sealing on a range of pipe sizes"
    ],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "The safety rams utilize wellbore pressure to affect the seal on closure.",
    options: ["True", "False"],
    correctAnswer: 0
  },
  {
    id: 10,
    question: "What could be included as an external pressure control device?",
    options: ["Annular", "Stab-in/safety valve", "Plug", "Back pressure valve"],
    correctAnswer: 0
  },
  {
    id: 11,
    question: "Which of the following can be used as a pressure control device in snubbing operations?",
    options: [
      "Fluid pump",
      "Annular BOP",
      "Trip tank",
      "Mud gas separator"
    ],
    correctAnswer: 1
  },
  {
    id: 12,
    question: "Which sealing element can seal against or pass a tool joint in a snubbing operation?",
    options: ["Annular", "Stripper ram", "Safety ram", "All the above"],
    correctAnswer: 0
  },
  {
    id: 13,
    question: "Which of the following pieces of Snubbing equipment is the most subject to wear and is expected to be replaced during normal stripping operations?",
    options: ["Flow Tee", "Shear Rams", "Snubbing Annular", "Blind Ram"],
    correctAnswer: 2
  },
  {
    id: 14,
    question: "What could be Included as an external pressure control device?",
    options: [
      "Stab-in/safety valve",
      "Back pressure valve",
      "Shear-blind rams"
    ],
    correctAnswer: 2
  },
  {
    id: 15,
    question: "While tripping pipe out of the well, the string could change from a pipe heavy to a pipe light condition when closing the full open safety valve.",
    options: ["True", "False"],
    correctAnswer: 0
  },
  {
    id: 16,
    question: "During snubbing operations, which actions would be taken in the event of stripping ram element fail?",
    options: [
      "Secure pipe from movement, replace annular element, and install FOSV in the workstring",
      "Secure pipe from movement, seal annulus by closing and locking safety rams, and install FOSV in the workstring",
      "Secure pipe from movement, increase fluid weight, and install stab-in safety valve",
      "Secure pipe from movement, seal annulus by closing pipe rams, and install stab-in safety valve"
    ],
    correctAnswer: 1
  },
  {
    id: 17,
    question: "On a snubbing operation, the primary barrier has failed and needs to be replaced. The upper and lower safety rams have been closed. Which of the following is an acceptable method to check if the BOP rams are sealing?",
    options: [
      "After bleeding off the pressure above the BOP's and safe to do so, perform a visual check above the ram BOP'S",
      "Observe pressure build-up between safety ram and blind ram",
      "After bleeding off the pressure above the upper safety ram, observe for pressure build-up and/or flow."
    ],
    correctAnswer: 2
  },
  {
    id: 18,
    question: "Identify the location of choke line and kill line on a snubbing well control stack",
    options: ["Location A", "Location B", "Location C", "Location D"],
    correctAnswer: 1,
    image: snubbingStack
  },
  {
    id: 19,
    question: "When changing a Snubbing sealing element, which is the primary means of maintaining the barrier?",
    options: [
      "Close slip ram",
      "Circulating kill fluid",
      "Closing annular BOP",
      "Closing and locking safety rams"
    ],
    correctAnswer: 3
  },
  {
    id: 20,
    question: "Which immediate action would be taken in the event of a leak in the stripper PCE ram?",
    options: [
      "Continue to snub",
      "Close annular",
      "Install guide ram",
      "Close safety pipe rams"
    ],
    correctAnswer: 3
  },
  {
    id: 21,
    question: "After a snubbing operation in an H2S well with pressure, it is best practice to change all sealing elements, even if not used.",
    options: ["False", "True"],
    correctAnswer: 1
  },
  {
    id: 22,
    question: "Which of the following may prevent buckling of a snubbing string in the BOPE or wellbore?",
    options: [
      "Limiting the snubbing force applied to the workstring",
      "Install a guide ram in the BOPE in the stackup",
      "Adjust hydraulic pressure in snubbing circuit to below buckle force",
      "All the above"
    ],
    correctAnswer: 3
  },
  {
    id: 23,
    question: "What is the purpose of the guide tube used on snubbing units?",
    options: [
      "It is used to guide the tubing up to the workbasket",
      "It prevents pipe buckling at surface",
      "To seal on the pipe",
      "To prevent well control problems"
    ],
    correctAnswer: 1
  },
  {
    id: 24,
    question: "When is a guide ram used during a snubbing operation?",
    options: [
      "When closing and locking the safety rams",
      "When additional support is required within the BOP stack to prevent buckling",
      "When running a long BHA",
      "When replacing the stripping element"
    ],
    correctAnswer: 1
  },
  {
    id: 25,
    question: "When figuring force on a valve, what equation should be used?",
    options: [
      "Diameter² x 0.7854 + Pressure",
      "Diameter² + Pressure x 0.7854",
      "Diameter² x 0.7854 x Pressure",
      "Diameter² x 0.7854 ÷ Pressure"
    ],
    correctAnswer: 2
  },
  {
    id: 26,
    question: "What following well has the same snubbing force as running a 7-inch OD pipe against 1,500 psi surface pressure?",
    options: [
      "2-3/8\" OD tubing with 9,773 psi surface pressure",
      "2-3/8\" OD tubing with 13,031 psi surface pressure",
      "2-3/8\" OD tubing with 6,430 psi surface pressure",
      "2-3/8\" OD tubing with 2,315 psi surface pressure"
    ],
    correctAnswer: 1
  },
  {
    id: 27,
    question: "What needs to be considered when calculating snub force?",
    options: [
      "The viscosity of wellbore fluid",
      "The pressure in the wellbore",
      "Tubular thread type",
      "All the above"
    ],
    correctAnswer: 1
  },
  {
    id: 28,
    question: "Calculate the estimated snubbing force required on this well:\n• Casing: 5 ½\" OD; 4.995\" ID\n• Tubing: 2 7/8\" OD; 2.441\" ID\n• Well Pressure: 7,500 psi",
    options: ["35,098 lb's", "48,689 lb's", "72,378 lb's", "98,279 lb's"],
    correctAnswer: 1
  },
  {
    id: 29,
    question: "What contributes to downward forces in a snubbing operation?",
    options: [
      "Tubing weight",
      "Burst pressure of the tubing",
      "Perforation depth",
      "The viscosity of wellbore fluid"
    ],
    correctAnswer: 1
  },
  {
    id: 30,
    question: "What contributes to downward forces in a snubbing operation?",
    options: [
      "Burst pressure of the tubing",
      "Tubing weight",
      "Height of fluid inside tubing"
    ],
    correctAnswer: 2
  },
  {
    id: 31,
    question: "What contributes to upward forces in a snubbing operation?",
    options: [
      "Tubing yield strength",
      "Tubing weight",
      "Net cross sectional sealing area",
      "Bottom hole temperature"
    ],
    correctAnswer: 2
  },
  {
    id: 32,
    question: "What contributes to upward forces in a snubbing operation?",
    options: [
      "Burst pressure of the tubing",
      "Tubing weight",
      "Well pressure"
    ],
    correctAnswer: 2
  },
  {
    id: 33,
    question: "Why is a guide ram used in snubbing operation?",
    options: [
      "To seal on the pipe",
      "To prevent pipe buckling within the BOP equipment",
      "To centralize a large BHA",
      "To prevent well control problems"
    ],
    correctAnswer: 1
  },
  {
    id: 34,
    question: "While in a snubbing operation with pipe out of the hole, what steps need to be taken to secure the pipe in the wellbore?",
    options: [
      "Stop pipe movement, close safety rams, bleed-off pressure above safety rams",
      "Close blind ram",
      "Close stripper rams",
      "Close slip ram"
    ],
    correctAnswer: 1
  }
];

export const wirelineQuestions: Question[] = [
  {
    id: 1,
    question: "In a slickline operation, what is the first step to take when the stuffing box is leaking?",
    options: [
      "Increase pressure on stuffing box",
      "Stop wire movement",
      "Cut the wire",
      "Kill the well"
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "The stuffing box will not likely need to be re-packed after each job.",
    options: ["True", "False"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What Is a potential well control Issue when using stuffing boxes?",
    options: ["Hydrate formation", "Loss of primary seal", "None of above"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "What two pieces of equipment make up the primary barrier for wireline operations?",
    options: [
      "Wireline rams and lower master valve",
      "Additional shear-seal ram and upper master valve",
      "Line wiper and upper wire sheave",
      "Lubricator and grease head/pack-off assembly"
    ],
    correctAnswer: 3
  },
  {
    id: 5,
    question: "Which of the following Is used to prevent the flow of gas between the wire strands of braided cable and E-line?",
    options: [
      "Quick test sub",
      "Tool catcher",
      "Grease Injector",
      "All the above"
    ],
    correctAnswer: 2
  },
  {
    id: 6,
    question: "When utilizing old wire in new flow tubes, the risk of stuck wire in flow tube is increased.",
    options: ["False", "True"],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "What grease injection pressure is required to maintain a pressure seal on a well with 3,200 psi MASP?",
    options: [
      "Lower than 3,200 psi",
      "Higher than 3,200 psi",
      "Equal to 3,200 psi"
    ],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "If grease injection is not properly maintained on braided line cable during operation, what is a potential well control risk?",
    options: [
      "No risks associated with losing grease injection with braided line cable",
      "The lack of lubrication will significantly impact the life cycle of the spool, and it will need to be changed more frequently",
      "Hydrocarbons can be brought to surface within the strands of wire",
      "The wire will stick in the lubricator and pack-off and get jammed"
    ],
    correctAnswer: 2
  },
  {
    id: 9,
    question: "What pressure should grease injection be supplied to in order to be effective?",
    options: [
      "500 psi less than wellbore pressure",
      "More than wellbore pressure",
      "500 psi more than accumulator pressure",
      "None of the above"
    ],
    correctAnswer: 1
  },
  {
    id: 10,
    question: "What is the function of the ball check valve in an e-line operation?",
    options: [
      "A standalone component or integral part of the stuffing box",
      "Contain well pressure and fluids when wire is present",
      "Contain well pressure and fluids when wire is not present",
      "Hold tool in place so it will not full down hole"
    ],
    correctAnswer: 2
  },
  {
    id: 11,
    question: "Where is the wireline ram generally NOT located in the pressure control equipment configuration?",
    options: [
      "Below the pump-in-sub",
      "Above the quick test sub",
      "Below the Wireline Shear Seal"
    ],
    correctAnswer: 2
  },
  {
    id: 12,
    question: "Where is the wireline ram located in the pressure control equipment configuration?",
    options: [
      "Above the pump-in sub",
      "Above the quick test sub",
      "Below the pump-in sub",
      "Below the Wireline Shear Seal"
    ],
    correctAnswer: 0
  },
  {
    id: 13,
    question: "A blind ram will seal on a 0.125\" slickline wire.",
    options: ["False", "True"],
    correctAnswer: 1
  },
  {
    id: 14,
    question: "What is the function of the wireline shear seal?",
    options: [
      "Shear tubing and seal wireline",
      "Shear wireline and seal wellbore",
      "Shear tools and seal wellbore",
      "Shear tools and seal wireline"
    ],
    correctAnswer: 1
  },
  {
    id: 15,
    question: "What is the function of the braided line rams in the wireline BOP?",
    options: [
      "Provides a means to isolate the well from the pressure control equipment",
      "Provides a positive seal around a stationary wire.",
      "Provides a means to cut the wire.",
      "Provides a means to equalize the tubing and lubricator"
    ],
    correctAnswer: 1
  },
  {
    id: 16,
    question: "Shear seal rams used with slickline can always shear the tool string stem/weight bar.",
    options: ["True", "False"],
    correctAnswer: 1
  },
  {
    id: 17,
    question: "When rigging up on a well that requires a Wireline Shear Seal where would it be located in the pressure control equipment configuration?",
    options: [
      "Above the pump-ln-sub",
      "Below the pump-in sub",
      "Below the wireline valve",
      "A and C"
    ],
    correctAnswer: 3
  },
  {
    id: 18,
    question: "Which of the following can NOT be sheared by a wireline shear ram?",
    options: ["Slick line", "Braided line", "Tool string", "E-line"],
    correctAnswer: 2
  },
  {
    id: 19,
    question: "Which of the following is NOT a possible consequence of using a shear seal ram?",
    options: [
      "Leak at connection between production tree and wireline ram",
      "Inability to circulate down the well",
      "Tools/string stuck across tree",
      "Requires additional grease"
    ],
    correctAnswer: 3
  },
  {
    id: 20,
    question: "Wireline Rams are designed to hold pressure from either direction; therefore, there is no need to invert one of them to enable them to hold pressure from below?",
    options: ["True", "False"],
    correctAnswer: 1
  },
  {
    id: 21,
    question: "In wireline operations, what is the function of a quick test sub?",
    options: [
      "It allows pressure testing integrity of the connection, including the entire lubricator assembly",
      "Used to perform initial pressure test",
      "It keeps the pressure from going too high on the lubricator",
      "It allows pressure testing integrity of the connection without testing the entire lubricator assembly"
    ],
    correctAnswer: 3
  },
  {
    id: 22,
    question: "What is a potential well control risk when using a quick test sub?",
    options: [
      "Other connections in the PCE are not pressure tested and verified, except for during initial rig-up",
      "Shorten lubricator length",
      "No associated risk with using a quick test sub",
      "Does not allow for additional shut-in options"
    ],
    correctAnswer: 0
  },
  {
    id: 23,
    question: "Bowen/Quick Type connections should always be made up with which of the following?",
    options: [
      "Torqued to 8,500 ft-lb's",
      "Torqued to 8,500 ft-lbs",
      "By hand",
      "Pipe wrench"
    ],
    correctAnswer: 2
  },
  {
    id: 24,
    question: "How much surface pressure is required to balance at the sliding sleeve given the following?\n- Sliding Sleeve: 8,700' TVD / 9,000' MD\n- Packer: 8,800' TVD / 9,100' MD\n- Top Perforations: 10,000' TVD / 10,400' MD\n- 10.4 ppg in the Tubing\n- 0.444 psi/ft in the Casing",
    options: [
      "968 psi applied to annulus",
      "842 psi applied to the tubing",
      "842 psi applied to annulus",
      "968 psi applied to the tubing"
    ],
    correctAnswer: 2
  },
  {
    id: 25,
    question: "What problem(s) could occur while perforating an extremely underbalanced well in wireline operations?",
    options: [
      "Introduce formation solids and potentially sticking tools",
      "Tools blown up the hole",
      "Decreased production",
      "Both A and B"
    ],
    correctAnswer: 3
  },
  {
    id: 26,
    question: "During open hole logging on a drilling rig, after actuating/functioning the wireline shear ram, the well may be secured using the following method:",
    options: [
      "Close rig's blind ram",
      "Wireline Valve",
      "Wellhead Tree Valves",
      "All the above"
    ],
    correctAnswer: 0
  },
  {
    id: 27,
    question: "The grease Injection head has lost seal on the braided line during an operation. The crew has determined that the grease pump has failed, What action should the crew perform to regain the seal on the wire?",
    options: [
      "Stop cable, increase hydraulic pressure on the pack-off, and pull wire out of well",
      "Stop cable, Increase pressure on the pack-off, switch to redundant grease pump and pull out of the well",
      "Stop cable, increase pressure on the pack-off. switch to redundant grease pump and continue operations",
      "Stop cable, increase hydraulic pressure on line wiper and pull wire out of well"
    ],
    correctAnswer: 1
  },
  {
    id: 28,
    question: "Which of the following could cause high bending stresses on the wellhead connection when running Wireline PCE?",
    options: [
      "Large unsupported lengths of lubricator",
      "Wireline valves positioned directly on wellhead",
      "Calm wind condition",
      "Pumping at high rates"
    ],
    correctAnswer: 0
  },
  {
    id: 29,
    question: "What is the importance of bottom-up circulation prior to conducting open-hole wireline operations?",
    options: [
      "Prepare for fracking",
      "Clean and condition the hole",
      "Prepare for perforating",
      "Stimulating the well"
    ],
    correctAnswer: 1
  },
  {
    id: 30,
    question: "Which of the following well control problems could occur during open hole logging?",
    options: [
      "Swabbing",
      "Trapped pressure below stuck logging tool",
      "Gas migration",
      "All the above"
    ],
    correctAnswer: 3
  },
  {
    id: 31,
    question: "While pressure testing the lubricator with needle valve, you notice a small leak. What should be done?",
    options: [
      "Bleed off the test pressure, repair the leak, and retest",
      "Bleed off the test pressure and retest at a faster rate",
      "If the leak is small continue the operation",
      "Immediately tighten the connection under pressure"
    ],
    correctAnswer: 0
  },
  {
    id: 32,
    question: "With the tree installed, and after shearing wire with a wireline shear ram, the well may be secured using the following method:",
    options: [
      "Kill well with kill weight fluid",
      "Close upper master valve",
      "Close Blind Ram",
      "B or C"
    ],
    correctAnswer: 3
  },
  {
    id: 33,
    question: "With the tree installed, and after shearing wire with a wireline shear ram, the well may be secured using the following method:",
    options: [
      "Kill well with kill weight fluid",
      "Close wireline valve",
      "Close Tree Valves",
      "B or C"
    ],
    correctAnswer: 2
  },
  {
    id: 34,
    question: "What is a potential well control risk when using e-line (conductor)/braided line rams in a wireline ram assembly?",
    options: [
      "Stuffing box failure",
      "Tool string could get stuck across tree",
      "Migration of gas through the strands/coating",
      "All of the above"
    ],
    correctAnswer: 2
  },
  {
    id: 35,
    question: "What type of wellbore contaminants may impede the ability to run a tool string in to or out of the wellbore?",
    options: ["Brine", "Paraffin", "Hydrocarbons", "Both B and C"],
    correctAnswer: 1
  },
  {
    id: 36,
    question: "Which of the following are necessary for a successful fishing operation?",
    options: [
      "Proper rams for wire",
      "Proper fishing tool",
      "Size and length of lubricator",
      "All the above"
    ],
    correctAnswer: 3
  },
  {
    id: 37,
    question: "With tools deployed, in which one of the situations below would the Shear Seal be activated to cut the wireline and seal the well?",
    options: [
      "Leak at connection between Stuffing Box and Lubricator",
      "Leak at Lubricator",
      "Leak at connection between production tree and wireline ram",
      "Leak at Stuffing Box"
    ],
    correctAnswer: 2
  },
  {
    id: 38,
    question: "Without the tree installed, and after shearing wire with a wireline ram shear ram, the well may be secured using the following method:",
    options: [
      "Kill well with kill weight fluid",
      "Close pipe rams",
      "Close blind ram",
      "All the above"
    ],
    correctAnswer: 2
  },
  {
    id: 39,
    question: "What well control risk could occur during slickline if improper ram alignment occurred?",
    options: [
      "Tool string could get stuck across tree",
      "Blow-by will occur and pressure will be against the stuffing box",
      "Grease injector head will not be able to contain well pressure",
      "None of the above"
    ],
    correctAnswer: 1
  },
  {
    id: 40,
    question: "Which of the following scenario(s) would be considered as a wireline well control drill?",
    options: [
      "Tool string stuck across tree",
      "Leak through stuffing box",
      "Stranded cable (birdnest)",
      "All the above"
    ],
    correctAnswer: 3
  }
];

export const workoverQuestions: Question[] = [
  {
    id: 1,
    question: "The four principles of systemic risk management are: identify, quantify/qualify, mitigate, and _______ .",
    options: ["Communication", "Calibrate", "Kill sheet", "Control risk"],
    correctAnswer: 3
  },
  {
    id: 2,
    question: "Which of the following statements best describe Well Integrity?",
    options: [
      "The ability of a well to maintain its structural integrity and prevent the controlled flow of fluids or gases between the wellbore and the surrounding formation, preventing expected release into the environment.",
      "The ability of a well to maintain natural production rate.",
      "The ability of a well to maintain its structural integrity and prevent the uncontrolled flow of fluids or gases between the wellbore and the surrounding formation, preventing unintended release into the environment.",
      "None of the above"
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "Of the following, which of these has a greater risk of occurring at night?",
    options: ["Better lighting", "Difficulty in leak detection", "Releasing of packer"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "Wells drilled prior to 1970 do not need data reviewed due to the age of the well.",
    options: ["True", "False"],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "The most common reason for well control events during workover and completion operations is:",
    options: ["Human error", "The fluid density is too heavy", "Clear work instructions", "All of the above"],
    correctAnswer: 0
  },
  {
    id: 6,
    question: "Environmental factors can influence well control operations. Which of the following is NOT correct?",
    options: [
      "For offshore operations, seas state or height of the waves or strength of the current can affect the well control response.",
      "Temperature - cold temperatures can affect the closing time of rams on BOPs, wireline valves, and pressure control stacks due to making the control fluids more viscous.",
      "Temperature, high winds, and sea conditions are not important considerations for well control operations."
    ],
    correctAnswer: 2
  },
  {
    id: 7,
    question: "What information should be pre-recorded and available at the job site for a well intervention or completion operation?",
    options: [
      "Tubing/casing diameters/capacities, depths of tubulars/perforations, date the well was drilled, and past volumes of fluid added to the well",
      "Tubing/casing diameters/capacities, depths of tubulars/perforations, the drilling rig name and nationality",
      "Tubing/casing diameters/capacities, depths of tubulars/perforations, kill fluid density, and fluid volumes required"
    ],
    correctAnswer: 2
  },
  {
    id: 8,
    question: "A high temperature well is put on production for the very first time. What is the Importance of closely monitoring the annulus pressure?",
    options: [
      "The tubing may burst if subjected to high reservoir temperatures",
      "The tubing may buckle if subjected to high reservoir pressures",
      "The annulus pressure may rise above expected values."
    ],
    correctAnswer: 2
  },
  {
    id: 9,
    question: "While tripping pipe in or out of the hole, what surface equipment should be on the rig floor?",
    options: ["Full open safety valve", "Inside BOP", "Cross over Subs", "All the above"],
    correctAnswer: 3
  },
  {
    id: 10,
    question: "Highest calculated pressure that a given equipment will be subjected to during the execution of the prescribed service and/or during a contingency operation is defined as ………….. ",
    options: ["Maximum Anticipated Surface Pressure (MASP)", "Maximum Allowable Operating Pressure (MAOP)"],
    correctAnswer: 1
  },
  {
    id: 11,
    question: "The MAOP may be equal to or greater than the MASP but less than or equal to …….",
    options: ["MAASP", "MAWP"],
    correctAnswer: 1
  },
  {
    id: 12,
    question: "Which factor is MAOP based upon?",
    options: ["MASP", "MAASP", "Test pressure of the equipment", "All the above"],
    correctAnswer: 2
  },
  {
    id: 13,
    question: "A casing pressure test is performed post-completion to verify ………",
    options: ["Wellbore drift", "Formation Strength or Fracture Gradient", "Wellbore integrity (MAOP)"],
    correctAnswer: 2
  },
  {
    id: 14,
    question: "While drilling out a bridge plug in a 7\" casing, calculate the expected force due to trapped pressure below the bridge plug.\n• Anticipated pressure below bridge plug = 3,500 psi\n• Tubing Size = 2 7/8\" OD\n• Casing Size = 7\" OD / 6.45\" ID\n• Bridge Plug set at = 5,000' TVD / 6,250' MD",
    options: ["114,361 lbf", "134,696 lbf", "22,722 lbf", "19,242 lbf"],
    correctAnswer: 0
  },
  {
    id: 15,
    question: "Calculate the total volume in barrels of a 12'L x 8'W x 6'H tank.",
    options: ["104.8 bbls", "102.6 bbls", "97.5 bbls", "132.4 bbls"],
    correctAnswer: 1
  },
  {
    id: 16,
    question: "Calculate the annular volume for 8,500' of 2 7/8\" tubing with 2.441\" ID and 2.347\" drift. Casing is 7\", 26 ppf, 6.276\" ID.",
    options: ["336.4 bbls", "257.0 bbls", "420.7 bbls", "210.2 bbls"],
    correctAnswer: 1
  },
  {
    id: 17,
    question: "Calculate total barrels required to fill tubing, using the following information:\n• Pump output= 3 bbls/min\n• Tubing length = 12,000' MD/6,775' TVD\n• Tubing OD= 5 ½\" tubing\n• Tubing ID=4.67\" with 4.545\" drift",
    options: ["352.6 bbls", "143.5 bbls", "254.2 bbls"],
    correctAnswer: 2
  },
  {
    id: 18,
    question: "Calculate the pressure differential at the sliding sleeve given the following:\n• Sliding Sleeve: 8,700' TVD/9,000\" MD\n• Packer: 8,800\" TVD/9,100 MD\n• Top Perforations: 10,000 TVD/10,400\" MD\n• 10.4 ppg in the Tubing\n• 0.444 psi/ft in the Casing",
    options: ["968 psi", "842 psi", "650 psi", "720 psi"],
    correctAnswer: 1
  },
  {
    id: 19,
    question: "Calculate the equivalent circulating density while performing a conventional (forward) circulation with the following Information\n• 8.8 ppg fluid in the well\n• 10,000' TVD/14,000' MD\n• Annular Pressure Loss: 312 psi\n• Tubing Pressure Loss: 1,688 psi\n• Pump Pressure: 2,000 psi",
    options: ["12.1 ppg", "9.4 ppg", "9 ppg", "10.5 ppg"],
    correctAnswer: 1
  },
  {
    id: 20,
    question: "Calculate the feet of pipe that can be pulled open-ended (pulling dry) before decreasing bottom hole pressure by 50 psi using the following information:\n- Fluid weight = 10.2 ppg\n- Pump output = 0.0547 bbl/stk\n- Tubing length = 12,000' MD\n- Tubing Displacement = 0.0082 bbl's/ft\n- Tubing Capacity = 0.0212 bbl's/ft\n- Casing Capacity = 0.0548 bbl's/ft",
    options: ["536'", "94'", "386'", "206'"],
    correctAnswer: 0
  },
  {
    id: 21,
    question: "Given the following data, calculate the potential upward force from pressure below a bridge plug.\n• Formation Pressure = 2,000 psi\n• Casing Size = 7\" OD / 6.45\" ID\n• TVD = 5,000'\n• MD = 6,250'",
    options: ["10,132 lb's", "23,249 lb's", "65,349 lb's", "76,970 lb's"],
    correctAnswer: 2
  },
  {
    id: 22,
    question: "While displacing 10.5 ppg brine down the tubing with 9.0 ppg completion brine, the pumps fail after 45 bbl's. What would be the surface pressure after the pumps fail?\n• 8,700' TVD/MD\n• Tubing OD 2.875\" / ID 2.441\"\n• Tubing Capacity: 0.00579 bbl/ft\n• Casing Capacity: 0.0232 bbl/ft\n• Annular Capacity: 0.0152 bbl/ft",
    options: ["438 psi", "605 psi", "234 psi", "Not enough information"],
    correctAnswer: 1
  },
  {
    id: 23,
    question: "How could applied casing pressure lead to tubular failures?",
    options: ["Exceeding tubing collapse pressure", "Cause casing to burst", "Any combination of the above"],
    correctAnswer: 2
  },
  {
    id: 24,
    question: "What is the requirement for a component to be considered a barrier?",
    options: [
      "Component is pressure tested and verified",
      "Mechanical closed barrier: must be leak-tight",
      "Hydrostatic pressure is slightly more or equal formation pressure",
      "Combination of all the above"
    ],
    correctAnswer: 3
  },
  {
    id: 25,
    question: "What is the benefit of having multiple barriers?",
    options: [
      "A backup for a failed barrier system",
      "Multiplies production from the well",
      "Increases pressures that the barriers can withstand",
      "Reduces need for visual checks"
    ],
    correctAnswer: 0
  },
  {
    id: 26,
    question: "How is a barrier pressure test accomplished?",
    options: [
      "Increase pump pressure above Maximum Anticipated Surface Pressure (MASP)",
      "Increase a differential pressure across the barrier",
      "Decrease amount of fluid below the barrier and look for leaks",
      "Decrease accumulator pressure until leakage occurs"
    ],
    correctAnswer: 1
  },
  {
    id: 27,
    question: "What is an indicator of a failed negative/inflow pressure test?",
    options: ["Decreasing formation pressure", "Decreasing surface pressure", "Gain of fluid", "All the above"],
    correctAnswer: 2
  },
  {
    id: 28,
    question: "Which criteria are used as part of the selection of barrier elements?",
    options: [
      "Lifting/snubbing unit capacity",
      "Operational objectives of the job",
      "Maximum Allowable Annular Surface Pressure (MAASP)",
      "Number of crew members"
    ],
    correctAnswer: 1
  },
  {
    id: 29,
    question: "Which criteria are used as part of the selection of barrier elements?",
    options: [
      "Lifting/snubbing unit capacity",
      "Maximum Allowable Annular Surface Pressure (MAASP)",
      "Number of crew members",
      "Pressure rating"
    ],
    correctAnswer: 3
  },
  {
    id: 30,
    question: "In a completion/workover operation, the well barrier that prevents flow and is closest to the source of pressure, Is the ………….",
    options: ["Secondary Barrier", "Primary Barrier"],
    correctAnswer: 1
  },
  {
    id: 31,
    question: "A procedural barrier is used in conjunction with mechanical barriers to assist in the control monitoring of the well.",
    options: ["Column of fluid with verified height and density", "Physical element", "Set of policies and procedures"],
    correctAnswer: 2
  },
  {
    id: 32,
    question: "A tested, physical element of well control equipment is defined as what?",
    options: ["Fluid Barrier", "Mechanical Barrier", "Procedural Barrier", "None of the above"],
    correctAnswer: 1
  },
  {
    id: 33,
    question: "How is a mechanical barrier element verified?",
    options: [
      "Verified through visual inspection",
      "Based on Maximum Allowable Annulus Surface Pressure (MAASP)",
      "Verified by increasing pressure differential across the barriers"
    ],
    correctAnswer: 2
  },
  {
    id: 34,
    question: "Which of the following can be a mechanical barrier?",
    options: ["Tubing plug", "Well control method", "Trip drill", "Fluid hydrostatic pressure"],
    correctAnswer: 0
  },
  {
    id: 35,
    question: "Once a cement plug has been placed, how is integrity verified?",
    options: ["Positive Test", "Weight Test", "Negative/Inflow Test", "All the above"],
    correctAnswer: 3
  },
  {
    id: 36,
    question: "Barriers are used to manage flow from the formation and reduce the risk associated with drilling, completion, production, and intervention activities.",
    options: ["True", "False"],
    correctAnswer: 0
  },
  {
    id: 37,
    question: "The well barrier that prevents flow from the source and designed to isolate wellbore pressure in the event of primary barrier failure, is the ______ .",
    options: ["Procedural Barrier", "Emergency Closure", "Secondary Barrier", "Primary Barrier"],
    correctAnswer: 2
  },
  {
    id: 38,
    question: "Visual inspections routinely performed on BOP and wellhead equipment for what purpose?",
    options: [
      "Visual inspections can take the place of pressure tests",
      "Visual inspections can help detect fluid or pressure leaks",
      "Visual inspections are more efficient than function tests"
    ],
    correctAnswer: 1
  },
  {
    id: 39,
    question: "Barriers such as BOPE or PCE that have been verified, maintained, inspected, and tested; prevents loss of well fluids to the environment.",
    options: ["True", "False"],
    correctAnswer: 0
  },
  {
    id: 40,
    question: "A ______ is used to manage flow from the formation and reduce the risk associated with completion, production, workover, and intervention activities.",
    options: ["Barrier envelope", "Barrier", "Pressure control device", "Pressure control envelope"],
    correctAnswer: 1
  },
  {
    id: 41,
    question: "In a workover operation, is a grease head classified as a barrier or a pressure control device?",
    options: ["Barrier", "Pressure control device"],
    correctAnswer: 1
  },
  {
    id: 42,
    question: "What is an indicator of a primary fluid barrier failure?",
    options: [
      "Increase in fluid temperature",
      "Test fluid density with a scale",
      "Check fluid viscosity",
      "Flow from the well"
    ],
    correctAnswer: 3
  },
  {
    id: 43,
    question: "What is an indicator of a primary fluid barrier failure?",
    options: [
      "Test fluid density with a scale",
      "Increase in fluid temperature",
      "Complete fluid losses to the well",
      "Check fluid viscosity"
    ],
    correctAnswer: 2
  },
  {
    id: 44,
    question: "What is an indicator of a failed negative/inflow pressure test?",
    options: [
      "Increasing surface pressure",
      "Decreasing formation pressure",
      "Decreasing surface pressure",
      "None of the above"
    ],
    correctAnswer: 0
  },
  {
    id: 45,
    question: "With the well shut-in, what Indicates that the well is secured?",
    options: ["Installed safety valve", "No observable flow at surface", "All the above"],
    correctAnswer: 1
  },
  {
    id: 46,
    question: "What is an indicator of a secondary barrier (pressure control equipment) failure?",
    options: ["Loss of hydrostatic pressure", "Leak to atmosphere", "Pressure gain at surface", "All of the above"],
    correctAnswer: 1
  },
  {
    id: 47,
    question: "If a secondary barrier fails, what action should be taken?",
    options: [
      "Resort back to primary barrier",
      "Shut in highest elevation barrier",
      "Implement emergency response plan"
    ],
    correctAnswer: 2
  },
  {
    id: 48,
    question: "What action should be taken if there is a test failure of a mechanical well barrier/element?",
    options: [
      "Proceed cautiously, reduce test pressure by 20% and allow for stabilization",
      "Identify cause, and if necessary, reinstall barrier/element and then retest at required pressure",
      "Adjust required pressure and then retest at a lower pressure",
      "Small leaks are always acceptable"
    ],
    correctAnswer: 1
  },
  {
    id: 49,
    question: "In a workover operation, is a pipe ram classified as a barrier or a pressure control device?",
    options: ["Pressure control device", "Barrier"],
    correctAnswer: 1
  },
  {
    id: 50,
    question: "A _______ provides pressure containment and requires constant monitoring and operational support.",
    options: ["Barrier", "Barrier envelope", "Pressure control device", "Pressure control envelope"],
    correctAnswer: 2
  },
  {
    id: 51,
    question: "A(n) _______ barrier is utilized when only a single physical barrier is present during operations.",
    options: ["Procedural", "Mechanical", "Secondary"],
    correctAnswer: 0
  },
  {
    id: 52,
    question: "A procedural barrier is a _______ used in conjunction with mechanical barriers to assist in the control and monitoring of the well.",
    options: ["Column of fluid with verified height and density", "Set of policies and procedures", "Physical element"],
    correctAnswer: 1
  },
  {
    id: 53,
    question: "The Rated Working Pressure is less than the Maximum Allowable Working Pressure due to the designed safety factors.",
    options: ["True", "False"],
    correctAnswer: 1
  },
  {
    id: 54,
    question: "What is the purpose of a control panel for the accumulator system?",
    options: [
      "Controls main fluid accumulator tanks",
      "Maintains pump pressure, accumulates fluid",
      "Adjusts accumulator pressure",
      "Operates BOP components"
    ],
    correctAnswer: 3
  },
  {
    id: 55,
    question: "On a conventional well, what condition would adjusting the annular regulator pressure be considered?",
    options: [
      "Regulator pressure is never adjusted",
      "While recovering production liner from a well",
      "Running fishing tools across stack",
      "Stripping a tapered string"
    ],
    correctAnswer: 1
  },
  {
    id: 56,
    question: "When securing a well with pipe rams, the ram locking mechanisms should be used.",
    options: ["True", "False"],
    correctAnswer: 0
  },
  {
    id: 57,
    question: "Minimal operating manifold pressure is all that is needed to shear 1 ¼\" pipe.",
    options: ["True", "False"],
    correctAnswer: 1
  },
  {
    id: 58,
    question: "Why are visual inspections regularly performed on pressure control equipment?",
    options: [
      "Visual inspections can take the place of pressure tests",
      "Visual inspections are more efficient than function tests",
      "To verify there are no leaks",
      "Both B and C"
    ],
    correctAnswer: 2
  },
  {
    id: 59,
    question: "What is the function of the shear-blind rams?",
    options: [
      "Seals on open hole",
      "Shear tubulars and then seals over the open wellbore",
      "Shear the drill bit",
      "Both A and B"
    ],
    correctAnswer: 3
  },
  {
    id: 60,
    question: "What is the function of the blind rams?",
    options: [
      "Shear pipe",
      "Seals annulus with pipe in the well",
      "Seals over the open wellbore without tubular present",
      "Shear BHA"
    ],
    correctAnswer: 2
  },
  {
    id: 61,
    question: "What is NOT a function of the shear-blind rams?",
    options: [
      "Shear and seal on screen",
      "Seals wellbore with pipe in the well",
      "Seals on open hole",
      "Secure the well to repair stripper element",
      "All the above"
    ],
    correctAnswer: 0
  },
  {
    id: 62,
    question: "Variable bore rams are capable of supporting more hanging string weight than a fixed pipe ram.",
    options: ["True", "False"],
    correctAnswer: 1
  },
  {
    id: 63,
    question: "When working with a BOP remote panel, what is a consequence of losing air pressure?",
    options: [
      "Increases pressure to accumulator system",
      "Inability to function the well control components",
      "Nothing, everything is working properly",
      "Inability to function the annular only"
    ],
    correctAnswer: 1
  },
  {
    id: 64,
    question: "While working at night, which of the following is greatly affected by temperature changes?",
    options: ["Accumulator pressure fluctuations", "Pit levels", "Pumping rate", "All of the above"],
    correctAnswer: 0
  },
  {
    id: 65,
    question: "A rams' minimum operating pressure should be based on _______ .",
    options: ["MAASP", "MAWP", "MASP", "Both B and C"],
    correctAnswer: 3
  },
  {
    id: 66,
    question: "Is the manifold pressure required to cut pipe with a shear-blind ram the same as the pressure required to seal with a pipe ram?",
    options: ["Yes", "No"],
    correctAnswer: 1
  },
  {
    id: 67,
    question: "Under what two conditions would adjusting the annular regulator pressure be considered?",
    options: [
      "While recovering casing from a well and Running fishing tools across stack",
      "Stripping Operations",
      "Regulator pressure is never adjusted",
      "While recovering production liner from a well and stripping a tapered string"
    ],
    correctAnswer: 3
  },
  {
    id: 68,
    question: "Which well would have the fastest gas migration if influx was present?",
    options: [
      "Horizontal section of a well with solids-free fluid",
      "Through a 35-55 degree angle of the well with clear solids-free fluid",
      "Through a 25 degree angle with viscous fluid",
      "Vertical well, small ID casing, with solids-free fluid"
    ],
    correctAnswer: 1
  },
  {
    id: 69,
    question: "What is a disadvantage of using clear fluids instead of mud?",
    options: [
      "More fluid loss control",
      "Less fluid loss control",
      "Prevent skin damage of the formation",
      "More sensitive to pressure changes"
    ],
    correctAnswer: 1
  },
  {
    id: 70,
    question: "What is a disadvantage of using clear fluids instead of mud?",
    options: [
      "Prevent skin damage of the formation",
      "More fluid loss control",
      "More sensitive to pressure changes",
      "Higher temperature would create a greater loss of density"
    ],
    correctAnswer: 3
  },
  {
    id: 71,
    question: "What can be pumped to minimize fluid loss in completions?",
    options: ["Diesel", "Calcium carbonate pill", "Oil based mud", "Methanol"],
    correctAnswer: 1
  },
  {
    id: 72,
    question: "What additive can be included in workover fluids to limit fluid loss?",
    options: ["Zinc", "Calcium carbonate", "Cesium format"],
    correctAnswer: 1
  },
  {
    id: 73,
    question: "What can be pumped to minimize fluid loss in completions?",
    options: ["Zinc bromide", "High viscous pill", "Cesium Format"],
    correctAnswer: 1
  },
  {
    id: 74,
    question: "What material, when added, would have the greatest effect on density?",
    options: ["Calcium", "Aluminum", "Potassium chloride", "Cesium formate"],
    correctAnswer: 3
  },
  {
    id: 75,
    question: "What material can be added to workover fluids to dramatically increase density?",
    options: ["Potassium chloride", "Calcium", "Zinc bromide", "Sodium chloride"],
    correctAnswer: 2
  },
  {
    id: 76,
    question: "When deciding on sealing elements potential fluids encountered in the wellbore should not be considered.",
    options: ["True", "False"],
    correctAnswer: 1
  },
  {
    id: 77,
    question: "What brine weight (with no safety factor) should be mixed on surface to bullhead the well given the following information?\n• Fluid Density in Tubing: 6.2 ppg - SITP: 1,000 psi\n• TVD: 5,800'\n• Average Wellbore Temp. (AWBT): 250° F\n• Surface Mixing Temperature: 75° F",
    options: ["9.7 ppg", "9.5 ppg", "10.2 ppg", "10.0 ppg"],
    correctAnswer: 3,
    image: brineWeightTableQ77
  },
  {
    id: 78,
    question: "What brine weight (with no safety factor) should be mixed on surface to bullhead the well given the following information?\n• Fluid Density in Tubing: 6.2 ppg - SITP: 1,146 psi\n• TVD: 5,800'\n• Average Wellbore Temp (AWBT): 250F\n• Surface Mixing Temperature: 75 F",
    options: ["10.0 ppg", "10.5 ppg", "9.5 ppg", "9.7 ppg"],
    correctAnswer: 1,
    image: brineWeightTableQ78
  },
  {
    id: 79,
    question: "Calculate the required surface density to be pumped for an equivalent 10.2 ppg fluid density with temperature effects.\n• TVD =12,000'\n• MD = 14,000'\n• Average Wellbore Temp = 250° F\n• Surface Ambient Temp = 80° F",
    options: ["10.9 ppg", "10.4 ppg", "10.7 ppg", "10.1 ppg"],
    correctAnswer: 2,
    image: brineWeightTableQ79
  },
  {
    id: 80,
    question: "Calculate the surface brine weight to workover this well\n• Formation pressure at the perforations: 3,820 psi at 7,700'\n• Bottomhole Temperature: 290F\n• Surface Temperature: 70F",
    options: ["10.2 ppg", "9.6 ppg", "9.9 ppg"],
    correctAnswer: 2,
    image: brineWeightTableQ80
  },
  {
    id: 81,
    question: "Why should the volume of test fluid pumped to reach the test pressure for a packer be monitored and recorded?",
    options: [
      "Monitoring and recording volume is not necessary for pressure testing a packer",
      "To compare with the test fluid volume bled back to determine if there was a leak across the packer",
      "To keep track of fluid losses to the formation to know how much completion fluid should be recovered when the well is brought on production",
      "All the above"
    ],
    correctAnswer: 1
  },
  {
    id: 82,
    question: "While pressure testing the annulus packer in the hole, without fluid in tubing, what could be a potential failure?",
    options: ["Tubing could burst", "Tubing could buckle", "Tubing could collapse", "All the above"],
    correctAnswer: 2
  },
  {
    id: 83,
    question: "While testing a permanent packer run on the production tubing, 5 bbl's of fluid was pumped in the annulus to achieve the test pressure. The pressure was bled off and 8 bbl's of fluid were recovered. What are the most likely cause(s) of bleeding back this additional fluid?",
    options: [
      "The compressibility of the test fluid was not taken into consideration",
      "The compression of the tubing allowed for the additional 3 bbl's once relaxed",
      "A leak in the system allowed an influx of formation fluid",
      "Temperature results in expansion of test fluid"
    ],
    correctAnswer: 2
  },
  {
    id: 84,
    question: "When pumping through a sliding sleeve, what occurs to frictional pressure as the fluid enters the tubing?",
    options: ["Stays the same", "Decreases", "Increases"],
    correctAnswer: 2
  },
  {
    id: 85,
    question: "Which of the following is NOT a typical well control procedure used to mitigate excessive casing pressure?",
    options: [
      "Choking down the well",
      "Reducing wellbore pressure by venting",
      "Increasing production rates",
      "Killing the well"
    ],
    correctAnswer: 1
  },
  {
    id: 86,
    question: "Which action would be taken in the event of flow at the surface inside the work string?",
    options: [
      "Stab a closed safety valve then open valve",
      "Stab an open safety valve then close valve",
      "Close annular",
      "Close safety pipe rams"
    ],
    correctAnswer: 1
  },
  {
    id: 87,
    question: "Which of the following actions should be taken immediately if a surface leak is detected during a well control operation?",
    options: [
      "Isolate the leaking section of the wellhead",
      "Continue the operation as planned",
      "Vent the excess pressure to the atmosphere",
      "Increase pumping rate to mitigate the leak"
    ],
    correctAnswer: 0
  },
  {
    id: 88,
    question: "Which of the following Is a crucial factor in determining the appropriate well control strategy?",
    options: [
      "Reservoir pressure",
      "Surface Equipment and Crew Competency",
      "Barrier Integrity and Redundancy",
      "All the above"
    ],
    correctAnswer: 3
  },
  {
    id: 89,
    question: "What is the definition of lub & bleed?",
    options: [
      "Pumping kill fluid direct to perforations",
      "Pumping small amount of kill fluid and waiting",
      "Reducing influx by increasing hydrostatics by removing gas by bleeding",
      "Managing gas to reach surface for keeping BHP constant"
    ],
    correctAnswer: 2
  },
  {
    id: 90,
    question: "When determining the Maximum Allowable Working Pressure for kill operations, the following are considered:",
    options: [
      "Rated Working Pressure of equipment, formation pressure, pressure rating of tubulars and equipment in the well, the test pressure of the equipment and safety margin",
      "The Maximum Anticipated Surface Pressure, the flow check valve position, the fluid pump test pressure, the Rated Working Pressure of the Wellhead",
      "Rated Working Pressure of equipment, formation pressure, pressure rating of tubulars and equipment in the well, the test pressure of the equipment, the position of the flow check valve, and shut-in tubing pressure of the well",
      "The Maximum Anticipated Surface Pressure, the fluid pump working pressure"
    ],
    correctAnswer: 0
  },
  {
    id: 91,
    question: "What are the important information/steps to record/follow after an influx has been identified and the well has been secured?",
    options: [
      "Identify the gas migration rate based on a controlled bleed.",
      "Check for leaks, record stabilized pressures, verify aliment of pressure control equipment.",
      "Prepare for Plug and abandonment plan",
      "Check for leaks, record fluid temperature in fluid pits, and check pipe tally."
    ],
    correctAnswer: 1
  },
  {
    id: 92,
    question: "The Volumetric Method is a:",
    options: [
      "Method where kill fluid is displaced in the well at the same time as the influx is removed.",
      "Method that involves repeatedly pumping in small quantities of kill fluid into the wellbore and then bleeding off excess pressure",
      "Method to control bottom hole pressure and allowing influx to expand without causing damage to the well"
    ],
    correctAnswer: 2
  },
  {
    id: 93,
    question: "During a Volumetric operation, a safety margin is applied to compensate for a(n) _______ to maintain bottomhole pressure constantly overbalanced.",
    options: [
      "Decrease in Friction Pressure",
      "Increase in Hydrostatic Pressure",
      "Decrease in Hydrostatic Pressure",
      "Increase in Friction Pressure"
    ],
    correctAnswer: 2
  },
  {
    id: 94,
    question: "Which well control method is recommended for wellbores with a potential or known concentration of H2S?",
    options: ["Lube and Bleed", "Conventional (Forward) Circulation", "Bullheading", "Reverse Circulation"],
    correctAnswer: 2
  },
  {
    id: 95,
    question: "For a bullhead operation, which completion component limits the maximum pump pressure?",
    options: ["Highest pressure rated component", "Packer", "Lowest pressure rated component"],
    correctAnswer: 2
  },
  {
    id: 96,
    question: "What would be a method to remove paraffin or asphaltenes before a workover operation?",
    options: [
      "Reverse circulation pumping heavy kill weight fluid",
      "Conventional (forward) circulation pumping heavy kill weight fluid",
      "Bullheading a treatment fluid"
    ],
    correctAnswer: 2
  },
  {
    id: 97,
    question: "Using the schematic below, for a vertical well, at what depth is volume calculated for a bullhead operation?",
    options: ["7,200'", "6,900'", "6,700'", "6,550'"],
    correctAnswer: 1,
    image: wellboreSchematicQ97
  },
  {
    id: 98,
    question: "Which of the following is the primary limiting factor in a bullhead operation?",
    options: [
      "Maximum Allowable Operating Pressure (MAOP)",
      "Maximum Anticipated Surface Pressure (MASP)",
      "Formation Pressure",
      "Both A and B"
    ],
    correctAnswer: 0
  },
  {
    id: 99,
    question: "Communication between casing annuli may:",
    options: [
      "Indicate a competent well barrier",
      "Indicate no issue and continue forward with operations",
      "Make well control remediation easier",
      "Complicate well kill operations"
    ],
    correctAnswer: 3
  },
  {
    id: 100,
    question: "In a well with 4.5\" OD/3.826\" ID casing and 2.875\" OD/2.441\" ID tubing, which circulation method would create the lowest bottomhole pressure?",
    options: ["Conventional (Forward) Circulation", "Reverse Circulation"],
    correctAnswer: 1
  },
  {
    id: 101,
    question: "A BOP was recently installed on a wellhead, what must be done in order for this BOP to be considered a part of the barrier envelope?",
    options: [
      "Function test BOP daily",
      "Clear to operate after install without pressure test performed",
      "Function test BOP weekly",
      "Pressure Test and Verify functionality of the BOP"
    ],
    correctAnswer: 3
  },
  {
    id: 102,
    question: "How would a crewmember verify if an annular is leaking during a well kill operation?",
    options: [
      "Visual observation",
      "Line up active pits through the mud gas separator",
      "Line up active pits to circulate on top of annular",
      "Monitor active pits using pit volume totalizers"
    ],
    correctAnswer: 0
  },
  {
    id: 103,
    question: "When conventional (forward) circulating, which frictional value(s) affect bottomhole pressure?",
    options: ["Friction from the annulus", "Friction from the tubing", "Pump pressure", "Both A and B"],
    correctAnswer: 0
  },
  {
    id: 104,
    question: "Which method of circulation has the most dramatic effect on bottom hole pressure?",
    options: ["Bullhead", "Forward circulation", "Lube and Bleed", "Reverse circulation"],
    correctAnswer: 3
  },
  {
    id: 105,
    question: "In a reverse circulation event, pumping through a sliding sleeve, what occurs to frictional pressure as the fluid enters the tubing?",
    options: ["Decreases", "Increases", "Stay same"],
    correctAnswer: 1
  },
  {
    id: 106,
    question: "In a well with 4 ½\" casing and 2 7/8\" tubing, which circulation method would create the highest bottomhole pressure?",
    options: ["Reverse Circulation", "Conventional (Forward) Circulation"],
    correctAnswer: 1
  },
  {
    id: 107,
    question: "During a reverse circulation, with pressure between the production casing and intermediate casing, what damage could be caused to the outer intermediate casing?",
    options: ["Rupture", "Collapse", "Swab", "No damage"],
    correctAnswer: 0
  },
  {
    id: 108,
    question: "Calculate the equivalent circulating density while performing a reverse circulation with the following information:\n• 8.8 ppg fluid in the well\n• 10,000' TVD/14,000' MD\n• Annular Pressure Loss: 284 psi\n• Tubing Pressure Loss: 1,716 psi\n• Pump Pressure: 2,000 psi",
    options: ["9.2 ppg", "9.4 ppg", "11.2 ppg", "12.1 ppg"],
    correctAnswer: 3
  },
  {
    id: 109,
    question: "In a horizontal well, which of the depths should be used to calculate kill weight fluid for a bullhead operation?\n• Total MD: 22,500'\n• Top of curve TVD: 7,750'\n• Landing point TVD: 8,150'\n• Stage 1 Perf MD: 8,275'\n• Stage 2 Perf MD: 9,075'",
    options: ["Total MD", "Landing Point", "Stage 1 Perf MD", "Stage 2 Perf MD"],
    correctAnswer: 1
  },
  {
    id: 110,
    question: "In a horizontal well, which of the depths should be used to calculate minimum volume needed for a bullhead operation?\n• Total MD: 22,500'\n• Top of curve TVD: 7,750'\n• Landing point TVD: 8,150'\n• Stage 1 Perf MD: 8,275'\n• Stage 2 Perf MD: 9,075'",
    options: ["Stage 2 Perf MD", "Stage 1 Perf MD", "Total MD", "Landing Point"],
    correctAnswer: 1
  },
  {
    id: 111,
    question: "When bullheading a well, injection calculations should be established to prevent _______ .",
    options: [
      "Exceeding MAOP",
      "Fracturing the formation",
      "Exceeding tubular burst pressure",
      "All the above"
    ],
    correctAnswer: 3
  },
  {
    id: 112,
    question: "Which method is used to remove gas from the well when circulating or bullheading is not possible, and gas is at surface?",
    options: ["Volumetric Method", "Lube & Bleed", "Reverse Circulation", "Forward Circulation"],
    correctAnswer: 1
  },
  {
    id: 113,
    question: "When reverse circulating which frictional value(s) affect bottomhole pressure?",
    options: [
      "Friction from the tubing",
      "Friction from the annulus",
      "Friction from the surface line",
      "Friction from the sliding sleeve"
    ],
    correctAnswer: 0
  },
  {
    id: 114,
    question: "The workstring was pulled out of the well and the blind rams were closed for equipment repair. An hour later, the casing gauge reads 450 psi. The crew suspects this is a result of gas migration. If the pressure is bled-off and the well is re-secured, what will happen to stabilized casing pressure?",
    options: ["Be higher than 450 psi", "Be lower than 450 psi", "Saty the same"],
    correctAnswer: 0
  },
  {
    id: 115,
    question: "What is a common cause of communication between casing strings during a workover or completion operation?",
    options: [
      "Good cement behind the casing strings",
      "Improper installation or damage to casing or packers",
      "Adequate well control procedures",
      "Verification of well integrity"
    ],
    correctAnswer: 1
  },
  {
    id: 116,
    question: "Which of the following is NOT a potential cause of equipment failure during a well control operation?",
    options: ["Improper maintenance plan", "Formation pressure", "Human error", "All of the above"],
    correctAnswer: 3
  },
  {
    id: 117,
    question: "What is a common cause of surface leaks during a well control operation?",
    options: [
      "Wear and tear on downhole equipment",
      "Improper installation of BOP stacks",
      "Sufficient fluid weight in the wellbore",
      "All the above"
    ],
    correctAnswer: 1
  },
  {
    id: 118,
    question: "When there is a potential of hydrates forming in the well, what is a potential well control risk?",
    options: [
      "Hydrates only form at high temperature, low pressures",
      "Blockage forms at choke manifold",
      "Hydrate plug forms in pressure control equipment (PCE)",
      "Both B and C"
    ],
    correctAnswer: 3
  },
  {
    id: 119,
    question: "Which of the following is NOT a typical well control problem during workover and well intervention operations?",
    options: [
      "Tubing pressure consistently decreases while Bullheading",
      "Snubbing stationary slips failing while in pipe light conditions",
      "Leak at the flange connection below the wireline valve",
      "Coiled tubing buckling between the stripper and injector chains preventing movement of the coiled tubing"
    ],
    correctAnswer: 0
  },
  {
    id: 120,
    question: "What is a potential consequence of fluid communication between casing strings with different fluid densities?",
    options: [
      "Reduced operational costs",
      "Improved wellbore stability",
      "Pressure imbalances and potential well control issues",
      "Increased production rates"
    ],
    correctAnswer: 2
  },
  {
    id: 121,
    question: "In a fracturing operation, it is not possible to exceed the MAOP of the surface equipment.",
    options: ["True", "False"],
    correctAnswer: 1
  },
  {
    id: 122,
    question: "During a frac stimulation job, the pressure gauge shows a rapid spike of pressure in the intermediate-production casing annular. Will this increased pressure compromise the integrity of your pressure envelope?",
    options: [
      "Yes, the production casing will collapse",
      "Yes, the production casing will burst",
      "No, everything is OK",
      "Insufficient information"
    ],
    correctAnswer: 3
  },
  {
    id: 123,
    question: "When there is a potential of hydrates forming in the well, what is a potential well control risk?",
    options: [
      "Creates blockage preventing pumping into the well",
      "Trapped pressure below hydrate giving incorrect surface pressure reading",
      "Hydrates only form at high temperature, low pressures",
      "Both A and B"
    ],
    correctAnswer: 3
  },
  {
    id: 124,
    question: "The workstring was pulled out of the well and the blind rams were closed for equipment repair. An hour later, the casing gauge reads 450 psi. If the pressure is bled-off and the kick is migrating, what will happen to the new stabilized casing pressure?",
    options: ["Be lower than 450 psi", "Be higher than 450 psi", "Saty the same"],
    correctAnswer: 1
  },
  {
    id: 125,
    question: "During a workover on a gas-producing well, a tubing-conveyed perforating gun was run into the well. By error, the perforations were too deep and total losses were experienced, what is a well control consideration?",
    options: [
      "A reduction in hydrostatic pressure could cause an influx of gas.",
      "There is no well control consideration",
      "Pull tubing-conveyed perforation quickly",
      "Both B and C"
    ],
    correctAnswer: 0
  },
  {
    id: 126,
    question: "A well control emergency procedure will function as the guideline for the crew in an emergency situation.",
    options: ["True", "False"],
    correctAnswer: 0
  }
];

export const iadcOgorMockTest1Questions: Question[] = [
  { id: 1, question: "Which of the following is NOT a typical well control procedure used to mitigate excessive casing pressure?", options: ["Choking down the well", "Reducing wellbore pressure by venting", "Increasing production rates", "Killing the well"], correctAnswer: 1 },
  { id: 2, question: "A tested, physical element of well control equipment is defined as what?", options: ["Fluid Barrier", "Mechanical Barrier", "Procedural Barrier", "None of the above"], correctAnswer: 1 },
  { id: 3, question: "If grease injection is not properly maintained on braided line cable during operation, what is a potential well control risk?", options: ["No risks associated with losing grease injection with braided line cable", "The lack of lubrication will significantly impact the life cycle of the spool, and it will need to be changed more frequently", "Hydrocarbons can be brought to surface within the strands of wire", "The wire will stick in the lubricator and pack-off and get jammed"], correctAnswer: 2 },
  { id: 4, question: "Which actions would be taken in the event of stripping ram element failure?", options: ["Secure pipe from movement, replace annular element, and install stab-in safety valve", "Secure pipe from movement, seal annulus by closing and locking safety rams, and install stab-in safety valve", "Secure pipe from movement, increase fluid weight, and install stab-in safety valve", "Secure pipe from movement, seal annulus by closing pipe rams, and install stab-in safety valve"], correctAnswer: 1 },
  { id: 5, question: "As coiled tubing ovality increases, what happens to collapse rating?", options: ["It does not change", "It increases", "It decreases"], correctAnswer: 2 },
  { id: 6, question: "When there is a potential of hydrates forming in the well, what is a potential well control risk?", options: ["Hydrates only form at high temperature, low pressures", "Blockage forms at choke manifold", "Hydrate plug forms in pressure control equipment (PCE)", "Both B and C"], correctAnswer: 3 },
  { id: 7, question: "Which well would have the fastest gas migration if influx was present?", options: ["Horizontal section of a well with solids-free fluid", "Through a 35-55 degree angle of the well with clear solids-free fluid", "Through a 25 degree angle with viscous fluid", "Vertical well, small ID casing, with solids-free fluid"], correctAnswer: 1 },
  { id: 8, question: "While tripping pipe out of the well, the string could change from a pipe heavy to a pipe light condition when closing the full open safety valve.", options: ["True", "False"], correctAnswer: 0 },
  { id: 9, question: "Wireline Rams are designed to hold pressure from either direction; therefore, there is no need to invert one of them to enable them to hold pressure from below?", options: ["True", "False"], correctAnswer: 1 },
  { id: 10, question: "What is the function of the wireline shear seal?", options: ["Shear tubing and seal wireline", "Shear wireline and seal wellbore", "Shear tools and seal wellbore", "Shear tools and seal wireline"], correctAnswer: 1 },
  { id: 11, question: "Which condition would dictate the need for redundant float/downhole check valves?", options: ["Pressure testing tubing", "When pumping at a high rate for extended periods", "When pumping at a low rate for extended periods", "Satisfying the two barrier rule"], correctAnswer: 1 },
  { id: 12, question: "Where is the wireline ram located in the pressure control equipment configuration?", options: ["Above the pump-in sub", "Above the quick test sub", "Below the pump-in sub", "Below the Wireline Shear Seal"], correctAnswer: 0 },
  { id: 13, question: "What type of wellbore contaminants may impede the ability to run a tool string in to or out of the wellbore?", options: ["Brine", "Paraffin", "Hydrocarbons", "Both B and C"], correctAnswer: 1 },
  { id: 14, question: "While circulating on a live well with coiled tubing, the stripper element has failed and needs to be replaced. The quad ram BOPs have been closed. Which of the following is an acceptable method to check if the BOP rams are sealing?", options: ["After bleeding off the pressure above the BOPs, keep the bleed-off valve open and observe for returns", "After bleeding off the lubricator, verify there is no build-up of pressure", "After bleeding off the pressure above the BOPs and if it is safe to do so, perform a visual check above the ram BOPs", "Both A and B"], correctAnswer: 1 },
  { id: 15, question: "What is a limitation of coiled tubing Well Control Stack when used as a secondary barrier?", options: ["Cannot move pipe", "Possible burst of coiled tubing", "Proper connection to the wellhead", "Can move pipe"], correctAnswer: 0 },
  { id: 16, question: "Which well control method is recommended for wellbores with a potential or known concentration of H2S?", options: ["Lube and Bleed", "Conventional (Forward) Circulation", "Bullheading", "Reverse Circulation"], correctAnswer: 2 },
  { id: 17, question: "Which of the following are necessary for a successful fishing operation?", options: ["Proper rams for wire", "Proper fishing tool", "Size and length of lubricator", "All the above"], correctAnswer: 3 },
  { id: 18, question: "While coiled tubing is in the well, a general muster alarm sounds. Put the following steps in the proper sequence.\n1. Shut down the pump\n2. Report to muster station\n3. Close pipe rams using accumulator system\n4. Stop coiled tubing movement", options: ["4, 1, 3, 2", "1, 3, 4, 2", "1, 4, 3, 2", "2, 4, 3, 1"], correctAnswer: 0 },
  { id: 19, question: "What problem(s) could occur while perforating an extremely underbalanced well in wireline operations?", options: ["Introduce formation solids and potentially sticking tools", "Tools blown up the hole", "Decreased production", "Both A and B"], correctAnswer: 3 },
  { id: 20, question: "Why should the volume of test fluid pumped to reach the test pressure for a packer be monitored and recorded?", options: ["Monitoring and recording volume is not necessary for pressure testing a packer", "To compare with the test fluid volume bled back to determine if there was a leak across the packer", "To keep track of fluid losses to the formation to know how much completion fluid should be recovered when the well is brought on production", "All the above"], correctAnswer: 1 },
  { id: 21, question: "Using the schematic below, for a vertical well, at what depth is volume calculated for a bullhead operation?", options: ["7,200'", "6,900'", "6,700'", "6,550'"], correctAnswer: 1, image: wellboreSchematicQ21 },
  { id: 22, question: "What is the purpose of a control panel for the accumulator system?", options: ["Controls main fluid accumulator tanks", "Maintains pump pressure, accumulates fluid", "Adjusts accumulator pressure", "Operates BOP components"], correctAnswer: 3 },
  { id: 23, question: "Which of the following is the primary limiting factor in a bullhead operation?", options: ["Maximum Allowable Operating Pressure (MAOP)", "Maximum Anticipated Surface Pressure (MASP)", "Formation Pressure", "Both A and B"], correctAnswer: 0 },
  { id: 24, question: "What is a consideration of tubing ratings?", options: ["Tensile", "Burst", "Collapse", "All the above"], correctAnswer: 3 },
  { id: 25, question: "In an H2S well, an additional shear-blind ram is not required for coiled tubing operations.", options: ["True", "False"], correctAnswer: 1 },
  { id: 26, question: "Multiple cycles across the tubing guide arch will reduce the strength of the coiled tubing.", options: ["True", "False"], correctAnswer: 0 },
  { id: 27, question: "When pumping through a sliding sleeve, what occurs to frictional pressure as the fluid enters the tubing?", options: ["Stays the same", "Decreases", "Increases"], correctAnswer: 2 },
  { id: 28, question: "What factor can impact the wear rate of the stripper element?", options: ["Coiled tubing circulation rate", "Differential pressure across the stripping element", "Outside air temperature", "BHA length"], correctAnswer: 1 },
  { id: 29, question: "Which of the following could cause high bending stresses on the wellhead connection when running Wireline PCE?", options: ["Large unsupported lengths of lubricator", "Wireline valves positioned directly on wellhead", "Calm wind condition", "Pumping at high rates"], correctAnswer: 0 },
  { id: 30, question: "Communication between casing annuli may:", options: ["Indicate a competent well barrier", "Indicate no issue and continue forward with operations", "Make well control remediation easier", "Complicate well kill operations"], correctAnswer: 3 },
  { id: 31, question: "Once a cement plug has been placed, how is integrity verified?", options: ["Positive Test", "Weight Test", "Negative/Inflow Test", "All the above"], correctAnswer: 3 },
  { id: 32, question: "The four principles of systemic risk management are: identify, quantify/qualify, mitigate, and _______.", options: ["Communication", "Calibrate", "Kill sheet", "Control risk"], correctAnswer: 3 },
  { id: 33, question: "When determining the Maximum Allowable Working Pressure for kill operations, the following are considered:", options: ["Rated Working Pressure of equipment, formation pressure, pressure rating of tubulars and equipment in the well, the test pressure of the equipment and safety margin", "The Maximum Anticipated Surface Pressure, the flow check valve position, the fluid pump test pressure, the Rated Working Pressure of the Wellhead", "Rated Working Pressure of equipment, formation pressure, pressure rating of tubulars and equipment in the well, the test pressure of the equipment, the position of the flow check valve, and shut-in tubing pressure of the well", "The Maximum Anticipated Surface Pressure, the fluid pump working pressure"], correctAnswer: 0 },
  { id: 34, question: "Barriers are used to manage flow from the formation and reduce the risk associated with drilling, completion, production, and intervention activities.", options: ["True", "False"], correctAnswer: 0 },
  { id: 35, question: "The well barrier that prevents flow from the source and designed to isolate wellbore pressure in the event of primary barrier failure, is the ______.", options: ["Procedural Barrier", "Emergency Closure", "Secondary Barrier", "Primary Barrier"], correctAnswer: 2 },
  { id: 36, question: "Which of the following, has a greater risk of occurring at night?", options: ["Better lighting", "Difficulty in leak detection", "Releasing of packer"], correctAnswer: 1 },
  { id: 37, question: "Which of the following is NOT a typical well control problem during workover and well intervention operations?", options: ["Tubing pressure consistently decreases while Bullheading", "Snubbing stationary slips failing while in pipe light conditions", "Leak at the flange connection below the wireline valve", "Coiled tubing buckling between the stripper and injector chains preventing movement of the coiled tubing"], correctAnswer: 0 },
  { id: 38, question: "During a Volumetric operation, a safety margin is applied to compensate for a(n) _______ to maintain bottomhole pressure constantly overbalanced.", options: ["Decrease in Friction Pressure", "Increase in Hydrostatic Pressure", "Decrease in Hydrostatic Pressure", "Increase in Friction Pressure"], correctAnswer: 2 },
  { id: 39, question: "On a conventional well, what condition would adjusting the annular regulator pressure be considered?", options: ["Regulator pressure is never adjusted", "While recovering production liner from a well", "Running fishing tools across stack", "Stripping a tapered string"], correctAnswer: 1 },
  { id: 40, question: "Visual inspections routinely performed on BOP and wellhead equipment for what purpose?", options: ["Visual inspections can take the place of pressure tests", "Visual inspections can help detect fluid or pressure leaks", "Visual inspections are more efficient than function tests"], correctAnswer: 1 },
  { id: 41, question: "While drilling out a bridge plug in a 7\" casing, calculate the expected force due to trapped pressure below the bridge plug.\n• Anticipated pressure below bridge plug = 3,500 psi\n• Tubing Size = 2 7/8\" OD\n• Casing Size = 7\" OD / 6.45\" ID\n• Bridge Plug set at = 5,000' TVD / 6,250' MD", options: ["114,361 lbf", "134,696 lbf", "22,722 lbf", "19,242 lbf"], correctAnswer: 0 },
  { id: 42, question: "When securing a well with pipe rams, the ram locking mechanisms should be used.", options: ["True", "False"], correctAnswer: 0 },
  { id: 43, question: "A well control emergency procedure will function as the guideline for the crew in an emergency situation.", options: ["True", "False"], correctAnswer: 0 },
  { id: 44, question: "Which sealing element can seal against or pass a tool joint in a snubbing operation?", options: ["Annular", "Stripper ram", "Safety ram", "All the above"], correctAnswer: 0 },
  { id: 45, question: "On a diesel power pack unit, the Emergency Shut-Down (ESD) switch does what to the unit?", options: ["Shuts off air", "Shuts off fuel", "Shuts off hydraulics", "Both A and B"], correctAnswer: 3 },
  { id: 46, question: "Which action would be taken in the event of flow at the surface inside the work string?", options: ["Stab a closed safety valve then open valve", "Stab an open safety valve then close valve", "Close annular", "Close safety pipe rams"], correctAnswer: 1 },
  { id: 47, question: "Barriers such as BOPE or PCE that have been verified, maintained, inspected, and tested; prevents loss of well fluids to the environment.", options: ["True", "False"], correctAnswer: 0 },
  { id: 48, question: "A ______ is used to manage flow from the formation and reduce the risk associated with completion, production, workover, and intervention activities.", options: ["Barrier envelope", "Barrier", "Pressure control device", "Pressure control envelope"], correctAnswer: 1 },
  { id: 49, question: "A BOP was recently installed on a wellhead, what must be done in order for this BOP to be considered a part of the barrier envelope?", options: ["Function test BOP daily", "Clear to operate after install without pressure test performed", "Function test BOP weekly", "Pressure Test and Verify functionality of the BOP"], correctAnswer: 3 },
  { id: 50, question: "What is a potential well control risk when using a quick test sub?", options: ["Other connections in the PCE are not pressure tested and verified, except for during initial rig-up", "Shorten lubricator length", "No associated risk with using a quick test sub", "Does not allow for additional shut-in options"], correctAnswer: 0 },
  { id: 51, question: "What is a consequence of exceeding the tubing tensile strength due to frictional forces when pulling pipe out of the hole?", options: ["Incorrect pipe tally", "Loss of circulation", "Reduction in fluid weight", "Necking down"], correctAnswer: 3 },
  { id: 52, question: "What is the importance of bottom-up circulation prior to conducting open-hole wireline operations?", options: ["Prepare for fracking", "Clean and condition the hole", "Prepare for perforating", "Stimulating the well"], correctAnswer: 1 },
  { id: 53, question: "How would a crewmember verify if an annular is leaking during a well kill operation?", options: ["Visual observation", "Line up active pits through the mud gas separator", "Line up active pits to circulate on top of annular", "Monitor active pits using pit volume totalizers"], correctAnswer: 0 },
  { id: 54, question: "When running internally tapered coiled tubing string, gripper blocks need to be changed.", options: ["True", "False"], correctAnswer: 1 },
  { id: 55, question: "What could be included as an internal snubbing barrier?", options: ["Fluid weight", "Annular", "Stripper ram", "Stab-in/safety valve"], correctAnswer: 3 },
  { id: 56, question: "Which of the following may prevent buckling of a snubbing string in the BOPE or wellbore?", options: ["Limiting the snubbing force applied to the workstring", "Install a guide ram in the BOPE in the stackup", "Adjust hydraulic pressure in snubbing circuit to below buckle force", "All the above"], correctAnswer: 3 },
  { id: 57, question: "Minimal operating manifold pressure is all that is needed to shear 1 ¼\" pipe.", options: ["True", "False"], correctAnswer: 1 },
  { id: 58, question: "Which immediate action would be taken in the event of a leak in the stripper PCE ram?", options: ["Continue to snub", "Close annular", "Install guide ram", "Close safety pipe rams"], correctAnswer: 3 },
  { id: 59, question: "The stuffing box will not likely need to be re-packed after each job.", options: ["True", "False"], correctAnswer: 1 },
  { id: 60, question: "What brine weight (with no safety factor) should be mixed on surface to bullhead the well given the following information?\n• Fluid Density in Tubing: 6.2 ppg - SITP: 1,000 psi\n• TVD: 5,800'\n• Average Wellbore Temp. (AWBT): 250° F\n• Surface Mixing Temperature: 75° F", options: ["9.7 ppg", "9.5 ppg", "10.2 ppg", "10.0 ppg"], correctAnswer: 3, image: brineWeightTableQ60 },
  { id: 61, question: "Which of the following well control problems could occur during open hole logging?", options: ["Swabbing", "Trapped pressure below stuck logging tool", "Gas migration", "All the above"], correctAnswer: 3 },
  { id: 62, question: "In a coiled tubing operation, what is the proper lubricator length?", options: ["4 to 6 feet", "10 to 12 feet", "Long enough to accommodate the maximum length of BHA to be run", "Short enough to prevent lubricator buckling"], correctAnswer: 2 },
  { id: 63, question: "What is an indicator of a primary fluid barrier failure?", options: ["Increase in fluid temperature", "Test fluid density with a scale", "Check fluid viscosity", "Flow from the well"], correctAnswer: 3 },
  { id: 64, question: "Which of the following actions should be taken immediately if a surface leak is detected during a well control operation?", options: ["Isolate the leaking section of the wellhead", "Continue the operation as planned", "Vent the excess pressure to the atmosphere", "Increase pumping rate to mitigate the leak"], correctAnswer: 0 },
  { id: 65, question: "Calculate the feet of pipe that can be pulled open-ended (pulling dry) before decreasing bottom hole pressure by 50 psi using the following information:\n• Fluid weight = 10.2 ppg\n• Pump output = 0.0547 bbl/stk\n• Tubing length = 12,000' MD\n• Tubing Displacement = 0.0082 bbl's/ft\n• Tubing Capacity = 0.0212 bbl's/ft\n• Casing Capacity = 0.0548 bbl's/ft", options: ["536'", "94'", "386'", "206'"], correctAnswer: 0 },
  { id: 66, question: "What is a potential consequence of fluid communication between casing strings with different fluid densities?", options: ["Reduced operational costs", "Improved wellbore stability", "Increased production rates", "Pressure imbalances and potential well control issues"], correctAnswer: 3 },
  { id: 67, question: "Which item is used to calculate coiled tubing forces?", options: ["Wall thickness and grade", "Tensile and compression strength of the coiled tubing", "Fluid density and weight of coiled tubing", "All the above"], correctAnswer: 3 },
  { id: 68, question: "If a secondary barrier fails, what action should be taken?", options: ["Resort back to primary barrier", "Shut in highest elevation barrier", "Implement emergency response plan"], correctAnswer: 2 },
  { id: 69, question: "While pressure testing the lubricator with needle valve, you notice a small leak. What should be done?", options: ["Bleed off the test pressure, repair the leak, and retest", "Bleed off the test pressure and retest at a faster rate", "If the leak is small continue the operation", "Immediately tighten the connection under pressure"], correctAnswer: 0 },
  { id: 70, question: "For any well capable of unassisted flow, the required valves between the coiled tubing Well Control Stack and pump, according to API RP 16ST, include:", options: ["Only one (1) full open valve is required", "Two (2) full open valves with a flow check device", "Two (2) full open valves with manual operators", "Two (2) full open valves with remote operators"], correctAnswer: 1 },
  { id: 71, question: "What does NOT affect the burst pressure rating of coiled tubing?", options: ["Pipe cycle fatigue", "Wall thickness (corrosion/erosion)", "Running speed", "Pipe Metallurgy"], correctAnswer: 2 },
  { id: 72, question: "Why is a guide ram used in snubbing operation?", options: ["To seal on the pipe", "To prevent pipe buckling within the BOP equipment", "To centralize a large BHA", "To prevent well control problems"], correctAnswer: 1 },
  { id: 73, question: "When conventional (forward) circulating, which frictional value(s) affect bottomhole pressure?", options: ["Friction from the annulus", "Friction from the tubing", "Pump pressure", "Both A and B"], correctAnswer: 1 },
  { id: 74, question: "What can be pumped to minimize fluid loss in completions?", options: ["Diesel", "Calcium carbonate pill", "Oil based mud", "Methanol"], correctAnswer: 1 },
  { id: 75, question: "The safety rams utilize wellbore pressure to affect the seal on closure.", options: ["True", "False"], correctAnswer: 0 },
  { id: 76, question: "With tools deployed, in which one of the situations below would the Shear Seal be activated to cut the wireline and seal the well?", options: ["Leak at connection between Stuffing Box and Lubricator", "Leak at Lubricator", "Leak at connection between production tree and wireline ram", "Leak at Stuffing Box"], correctAnswer: 2 },
  { id: 77, question: "Wells drilled prior to 1970 do not need data reviewed due to the age of the well.", options: ["True", "False"], correctAnswer: 1 },
  { id: 78, question: "What material, when added, would have the greatest effect on density?", options: ["Calcium", "Aluminum", "Potassium chloride", "Cesium formate"], correctAnswer: 3 },
  { id: 79, question: "Without the tree installed, and after shearing wire with a wireline ram shear ram, the well may be secured using the following method:", options: ["Kill well with kill weight fluid", "Close pipe rams", "Close blind ram", "All the above"], correctAnswer: 2 },
  { id: 80, question: "When may a flow check assembly be used in a coiled tubing bottomhole assembly?", options: ["When taking returns through the flow cross installed in the stack", "When running concentric coiled tubing", "When reverse circulating", "All the above"], correctAnswer: 0 },
  { id: 81, question: "What is the function of the shear-blind rams?", options: ["Seals on open hole", "Shear tubulars and then seals over the open wellbore", "Shear the drill bit", "Both A and B"], correctAnswer: 3 },
  { id: 82, question: "What action should be taken if there is a test failure of a mechanical well barrier/element?", options: ["Proceed cautiously, reduce test pressure by 20% and allow for stabilization", "Identify cause, and if necessary, reinstall barrier/element and then retest at required pressure", "Adjust required pressure and then retest at a lower pressure", "Small leaks are always acceptable"], correctAnswer: 1 },
  { id: 83, question: "How much surface pressure is required to balance at the sliding sleeve given the following?\n• Sliding Sleeve: 8,700' TVD / 9,000' MD\n• Packer: 8,800' TVD / 9,100' MD\n• Top Perforations: 10,000' TVD / 10,400' MD\n• 10.4 ppg in the Tubing\n• 0.444 psi/ft in the Casing", options: ["968 psi applied to annulus", "842 psi applied to the tubing", "842 psi applied to annulus", "968 psi applied to the tubing"], correctAnswer: 2 },
  { id: 84, question: "Which of the following is NOT a possible consequence of using a shear seal ram?", options: ["Leak at connection between production tree and wireline ram", "Inability to circulate down the well", "Tools/string stuck across tree", "Requires additional grease"], correctAnswer: 3 }
];

export const iadcOgorMockTest2Questions: Question[] = [
  { id: 1, question: "Which method of circulation has the most dramatic effect on bottom hole pressure?", options: ["Bullhead", "Forward circulation", "Lube and Bleed", "Reverse circulation"], correctAnswer: 3 },
  { id: 2, question: "In a workover operation, is a pipe ram classified as a barrier or a pressure control device?", options: ["Pressure control device", "Barrier"], correctAnswer: 1 },
  { id: 3, question: "Given the following data, calculate the potential upward force from pressure below a bridge plug.\n• Formation Pressure = 2,000 psi\n• Casing Size = 7\" OD / 6.45\" ID\n• TVD = 5,000'\n• MD = 6,250'", options: ["10,132 lb's", "23,249 lb's", "65,349 lb's", "76,970 lb's"], correctAnswer: 2 },
  { id: 4, question: "Which of the following is NOT a possible consequence of using a shear seal ram?", options: ["Leak at connection between production tree and wireline ram", "Inability to circulate down the well", "Tools/string stuck across tree", "Requires additional grease"], correctAnswer: 3 },
  { id: 5, question: "What is the function of the blind rams?", options: ["Shear pipe", "Seals annulus with pipe in the well", "Seals over the open wellbore without tubular present", "Shear BHA"], correctAnswer: 2 },
  { id: 6, question: "The Rated Working Pressure is less than the Maximum Allowable Working Pressure due to the designed safety factors.", options: ["True", "False"], correctAnswer: 1 },
  { id: 7, question: "What is NOT a function of the shear-blind rams?", options: ["Shear and seal on screen", "Seals wellbore with pipe in the well", "Seals on open hole", "Secure the well to repair stripper element"], correctAnswer: 0 },
  { id: 8, question: "For coiled tubing operations, which of the following is NOT true concerning slip rams?", options: ["Used to support the tubing weight when re-aligning or shearing pipe", "Their teeth should accommodate both light pipe and heavy pipe situations", "Will damage the coiled tubing when operated", "Are pressure sealing"], correctAnswer: 3 },
  { id: 9, question: "Calculate the estimated snubbing force required on this well:\n• Casing: 5 ½\" OD; 4.995\" ID\n• Tubing: 2 7/8\" OD; 2.441\" ID\n• Well Pressure: 7,500 psi", options: ["35,098 lb's", "48,689 lb's", "72,378 lb's", "98,279 lb's"], correctAnswer: 1 },
  { id: 10, question: "During a reverse circulation, with pressure between the production casing and intermediate casing, what damage could be caused to the outer intermediate casing?", options: ["Rupture", "Collapse", "Swab", "No damage"], correctAnswer: 0 },
  { id: 11, question: "What is the benefit of having multiple barriers?", options: ["A backup for a failed barrier system", "Multiplies production from the well", "Increases pressures that the barriers can withstand", "Reduces need for visual checks"], correctAnswer: 0 },
  { id: 12, question: "While testing a permanent packer run on the production tubing, 5 bbl's of fluid was pumped in the annulus to achieve the test pressure. The pressure was bled off and 8 bbl's of fluid were recovered. What are the most likely cause(s) of bleeding back this additional fluid?", options: ["The compressibility of the test fluid was not taken into consideration", "The compression of the tubing allowed for the additional 3 bbl's once relaxed", "A leak in the system allowed an influx of formation fluid", "Temperature results in expansion of test fluid"], correctAnswer: 2 },
  { id: 13, question: "When working with a BOP remote panel, what is a consequence of losing air pressure?", options: ["Increases pressure to accumulator system", "Inability to function the well control components", "Nothing, everything is working properly", "Inability to function the annular only"], correctAnswer: 1 },
  { id: 14, question: "In a horizontal well, which of the depths should be used to calculate kill weight fluid for a bullhead operation?\n• Total MD: 22,500'\n• Top of curve TVD: 7,750'\n• Landing point TVD: 8,150'\n• Stage 1 Perf MD: 8,275'\n• Stage 2 Perf MD: 9,075'", options: ["Total MD", "Landing Point", "Stage 1 Perf MD", "Stage 2 Perf MD"], correctAnswer: 1 },
  { id: 15, question: "Bowen/Quick Type connections should always be made up with which of the following?", options: ["Torqued to 8,500 ft-lb's", "Torqued to 8,500 ft-lbs", "By hand", "Pipe wrench"], correctAnswer: 2 },
  { id: 16, question: "Which of the following statements best describe Well Integrity?", options: ["The ability of a well to maintain its structural integrity and prevent the controlled flow of fluids or gases between the wellbore and the surrounding formation, preventing expected release into the environment.", "The ability of a well to maintain natural production rate.", "The ability of a well to maintain its structural integrity and prevent the uncontrolled flow of fluids or gases between the wellbore and the surrounding formation, preventing unintended release into the environment.", "None of the above"], correctAnswer: 2 },
  { id: 17, question: "What is considered an internal snubbing barrier?", options: ["Fluid weight", "Back pressure valves", "Safety ram", "Annular"], correctAnswer: 1 },
  { id: 18, question: "What prevents flow through the coiled tubing when not pumping?", options: ["Slip ram", "Pipe ram", "Bottomhole assembly check valves", "Both B and C"], correctAnswer: 2 },
  { id: 19, question: "Which of the following pieces of Snubbing equipment is the most subject to wear and is expected to be replaced during normal stripping operations?", options: ["Flow Tee", "Shear Rams", "Snubbing Annular", "Blind Ram"], correctAnswer: 2 },
  { id: 20, question: "What material can be added to workover fluids to dramatically increase density?", options: ["Potassium chloride", "Calcium", "Zinc bromide", "Sodium chloride"], correctAnswer: 2 },
  { id: 21, question: "While working at night, which of the following is greatly affected by temperature changes?", options: ["Accumulator pressure fluctuations", "Pit levels", "Pumping rate", "All of the above"], correctAnswer: 0 },
  { id: 22, question: "In a well with 4 ½\" casing and 2 7/8\" tubing, which circulation method would create the highest bottomhole pressure?", options: ["Reverse Circulation", "Conventional (Forward) Circulation"], correctAnswer: 1 },
  { id: 23, question: "When figuring force on a valve, what equation should be used?", options: ["Diameter² x 0.7854 + Pressure", "Diameter² + Pressure x 0.7854", "Diameter² x 0.7854 x Pressure", "Diameter² x 0.7854 ÷ Pressure"], correctAnswer: 2 },
  { id: 24, question: "A(n) _______ barrier is utilized when only a single physical barrier is present during operations.", options: ["Procedural", "Mechanical", "Secondary"], correctAnswer: 0 },
  { id: 25, question: "When bullheading a well, injection calculations should be established to prevent _______.", options: ["Exceeding MAOP", "Fracturing the formation", "Exceeding tubular burst pressure", "All the above"], correctAnswer: 3 },
  { id: 26, question: "What is NOT a function of shear-blind rams?", options: ["Seal on pipe without damaging pipe", "Seal on open hole", "Shears pipe", "Test casing"], correctAnswer: 0 },
  { id: 27, question: "Calculate the required surface density to be pumped for an equivalent 10.2 ppg fluid density with temperature effects.\n• TVD = 12,000'\n• MD = 14,000'\n• Average Wellbore Temp = 250° F\n• Surface Ambient Temp = 80° F", options: ["10.9 ppg", "10.4 ppg", "10.7 ppg", "10.1 ppg"], correctAnswer: 2, image: brineWeightTableQ27MT2 },
  { id: 28, question: "With the tree installed, and after shearing wire with a wireline shear ram, the well may be secured using the following method:", options: ["Kill well with kill weight fluid", "Close upper master valve", "Close Blind Ram", "B or C"], correctAnswer: 3 },
  { id: 29, question: "During a coiled tubing or snubbing operation, why would redundant float/downhole check valves be used?", options: ["In case one valve leaks", "Increasing BHA length", "Satisfying the two-barrier rule", "Pumping at a low rate for extended periods"], correctAnswer: 0 },
  { id: 30, question: "A rams' minimum operating pressure should be based on _______.", options: ["MAASP", "MAWP", "MASP", "Both B and C"], correctAnswer: 3 },
  { id: 31, question: "When could tubing buckling be encountered?", options: ["When running any tubular under compression with sufficient supported length", "When snubbing into highly deviated wells", "When well is full of light fluid", "When decreasing injector head force"], correctAnswer: 1 },
  { id: 32, question: "What is a potential well control risk when using e-line (conductor)/braided line rams in a wireline ram assembly?", options: ["Stuffing box failure", "Tool string could get stuck across tree", "Migration of gas through the strands/coating", "All of the above"], correctAnswer: 2 },
  { id: 33, question: "What is a disadvantage of using clear fluids instead of mud?", options: ["More fluid loss control", "Less fluid loss control", "Prevent skin damage of the formation", "More sensitive to pressure changes"], correctAnswer: 1 },
  { id: 34, question: "The most common reason for well control events during workover and completion operations is:", options: ["Human error", "The fluid density is too heavy", "Clear work instructions", "All of the above"], correctAnswer: 0 },
  { id: 35, question: "Identify the location of the kill port for a Coiled Tubing Well Control Stack.", options: ["A", "B", "C", "D"], correctAnswer: 2, image: coiledTubingStackQ35 },
  { id: 36, question: "What needs to be considered when calculating snub force?", options: ["The viscosity of wellbore fluid", "The pressure in the wellbore", "Tubular thread type", "All the above"], correctAnswer: 1 },
  { id: 37, question: "Which method is used to remove gas from the well when circulating or bullheading is not possible, and gas is at surface?", options: ["Volumetric Method", "Lube & Bleed", "Reverse Circulation", "Forward Circulation"], correctAnswer: 1 },
  { id: 38, question: "What does NOT affect the collapse pressure rating of coiled tubing?", options: ["Decrease in thickness", "Tension loads", "Perforated casing", "Percentage of ovality is 7 %"], correctAnswer: 2 },
  { id: 39, question: "What two pieces of equipment make up the primary barrier for wireline operations?", options: ["Wireline rams and lower master valve", "Additional shear-seal ram and upper master valve", "Line wiper and upper wire sheave", "Lubricator and grease head/pack-off assembly"], correctAnswer: 3 },
  { id: 40, question: "What contributes to downward forces in a snubbing operation?", options: ["Tubing weight", "Burst pressure of the tubing", "Perforation depth", "The viscosity of wellbore fluid"], correctAnswer: 1 },
  { id: 41, question: "A procedural barrier is a _______ used in conjunction with mechanical barriers to assist in the control and monitoring of the well.", options: ["Column of fluid with verified height and density", "Set of policies and procedures", "Physical element"], correctAnswer: 1 },
  { id: 42, question: "When reverse circulating which frictional value(s) affect bottomhole pressure?", options: ["Friction from the tubing", "Friction from the annulus", "Friction from the surface line", "Friction from the sliding sleeve"], correctAnswer: 0 },
  { id: 43, question: "What is an indicator of a primary fluid barrier failure?", options: ["Test fluid density with a scale", "Increase in fluid temperature", "Complete fluid losses to the well", "Check fluid viscosity"], correctAnswer: 2 },
  { id: 44, question: "While displacing 10.5 ppg brine down the tubing with 9.0 ppg completion brine, the pumps fail after 45 bbl's. What would be the surface pressure after the pumps fail?\n• 8,700' TVD/MD\n• Tubing OD 2.875\" / ID 2.441\"\n• Tubing Capacity: 0.00579 bbl/ft\n• Casing Capacity: 0.0232 bbl/ft\n• Annular Capacity: 0.0152 bbl/ft", options: ["438 psi", "605 psi", "234 psi", "Not enough information"], correctAnswer: 1 },
  { id: 45, question: "What is a disadvantage of using clear fluids instead of mud?", options: ["Prevent skin damage of the formation", "More fluid loss control", "More sensitive to pressure changes", "Higher temperature would create a greater loss of density"], correctAnswer: 3 },
  { id: 46, question: "When on or off bottom, what action is to be taken when there is buckled coiled tubing between injector and stripper assembly?", options: ["Prepare to kill the well", "Shear tubing and seal wellbore", "Strip out of the hole", "Increase injector head force"], correctAnswer: 0 },
  { id: 47, question: "While in a snubbing operation with pipe out of the hole, what steps need to be taken to secure the pipe in the wellbore?", options: ["Stop pipe movement, close safety rams, bleed-off pressure above safety rams", "Close blind ram", "Close stripper rams", "Close slip ram"], correctAnswer: 1 },
  { id: 48, question: "The workstring was pulled out of the well and the blind rams were closed for equipment repair. An hour later, the casing gauge reads 450 psi. The crew suspects this is a result of gas migration. If the pressure is bled-off and the well is re-secured, what will happen to stabilized casing pressure?", options: ["Be higher than 450 psi", "Be lower than 450 psi", "Stay the same"], correctAnswer: 1 },
  { id: 49, question: "Calculate the equivalent circulating density while performing a reverse circulation with the following information:\n• 8.8 ppg fluid in the well\n• 10,000' TVD/14,000' MD\n• Annular Pressure Loss: 284 psi\n• Tubing Pressure Loss: 1,716 psi\n• Pump Pressure: 2,000 psi", options: ["9.2 ppg", "9.4 ppg", "11.2 ppg", "12.1 ppg"], correctAnswer: 3 },
  { id: 50, question: "What is an indicator of a secondary barrier (pressure control equipment) failure?", options: ["Loss of hydrostatic pressure", "Leak to atmosphere", "Pressure gain at surface", "All of the above"], correctAnswer: 1 },
  { id: 51, question: "While running in the hole with coiled tubing, the stripper and check valve are operating normally. What function does the Quad Well Control Stack serve in this condition?", options: ["Primary barrier", "Secondary barrier", "Emergency closure"], correctAnswer: 1 },
  { id: 52, question: "Which criteria are used as part of the selection of barrier elements?", options: ["Lifting/snubbing unit capacity", "Operational objectives of the job", "Maximum Allowable Annular Surface Pressure (MAASP)", "Number of crew members"], correctAnswer: 1 },
  { id: 53, question: "When would dual strippers be considered when rigging-up a coiled tubing unit?", options: ["Long BHA length", "In low pressure environments", "In corrosive environments", "When using an internally tapered work string"], correctAnswer: 2 },
  { id: 54, question: "In a horizontal well, which of the depths should be used to calculate minimum volume needed for a bullhead operation?\n• Total MD: 22,500'\n• Top of curve TVD: 7,750'\n• Landing point TVD: 8,150'\n• Stage 1 Perf MD: 8,275'\n• Stage 2 Perf MD: 9,075'", options: ["Stage 2 Perf MD", "Stage 1 Perf MD", "Total MD", "Landing Point"], correctAnswer: 1 },
  { id: 55, question: "In a fracturing operation, it is not possible to exceed the MAOP of the surface equipment.", options: ["True", "False"], correctAnswer: 1 },
  { id: 56, question: "What is an indicator of a failed negative/inflow pressure test?", options: ["Increasing surface pressure", "Decreasing formation pressure", "Decreasing surface pressure", "None of the above"], correctAnswer: 0 },
  { id: 57, question: "What pressure should grease injection be supplied to in order to be effective?", options: ["500 psi less than wellbore pressure", "More than wellbore pressure", "500 psi more than accumulator pressure", "None of the above"], correctAnswer: 1 },
  { id: 58, question: "During a frac stimulation job, the pressure gauge shows a rapid spike of pressure in the intermediate-production casing annular. Will this increased pressure compromise the integrity of your pressure envelope?", options: ["Yes, the production casing will collapse", "Yes, the production casing will burst", "No, everything is OK", "Insufficient information"], correctAnswer: 3 },
  { id: 59, question: "When changing a Snubbing sealing element, which is the primary means of maintaining the barrier?", options: ["Close slip ram", "Circulating kill fluid", "Closing annular BOP", "Closing and locking safety rams"], correctAnswer: 3 },
  { id: 60, question: "How could applied casing pressure lead to tubular failures?", options: ["Exceeding tubing collapse pressure", "Cause casing to burst", "Any combination of the above"], correctAnswer: 2 },
  { id: 61, question: "Environmental factors can influence well control operations. Which of the following is NOT correct?", options: ["For offshore operations, seas state or height of the waves or strength of the current can affect the well control response.", "Temperature - cold temperatures can affect the closing time of rams on BOPs, wireline valves, and pressure control stacks due to making the control fluids more viscous.", "Temperature, high winds, and sea conditions are not important considerations for well control operations."], correctAnswer: 2 },
  { id: 62, question: "What affects the collapse pressure rating of coiled tubing?", options: ["Tension loads", "Amount of Corrosion/Erosion", "Wall thickness", "All of the above"], correctAnswer: 1 },
  { id: 63, question: "What contributes to upward forces in a snubbing operation?", options: ["Tubing yield strength", "Tubing weight", "Net cross sectional sealing area", "Bottom hole temperature"], correctAnswer: 2 },
  { id: 64, question: "In wireline operations, what is the function of a quick test sub?", options: ["It controls the pressure as line is worked through the stuffing box", "Used to perform initial pressure test", "It keeps the pressure from going too high on the lubricator", "It allows pressure testing integrity of the connection without testing the entire lubricator assembly"], correctAnswer: 3 },
  { id: 65, question: "What is the function of the ball check valve in an e-line operation?", options: ["A standalone component or integral part of the stuffing box", "Contain well pressure and fluids when wire is present", "Contain well pressure and fluids when wire is not present", "Hold tool in place so it will not full down hole"], correctAnswer: 2 },
  { id: 66, question: "Which of the following can be a mechanical barrier?", options: ["Tubing plug", "Well control method", "Trip drill", "Fluid hydrostatic pressure"], correctAnswer: 0 },
  { id: 67, question: "What are the important information/steps to record/follow after an influx has been identified and the well has been secured?", options: ["Identify the gas migration rate based on a controlled bleed.", "Check for leaks, record stabilized pressures, verify aliment of pressure control equipment.", "Prepare for Plug and abandonment plan", "Check for leaks, record fluid temperature in fluid pits, and check pipe tally."], correctAnswer: 1 },
  { id: 68, question: "Is the manifold pressure required to cut pipe with a shear-blind ram the same as the pressure required to seal with a pipe ram?", options: ["Yes", "No"], correctAnswer: 1 },
  { id: 69, question: "What could be included as an external pressure control device?", options: ["Annular", "Stab-in/safety valve", "Plug", "Back pressure valve"], correctAnswer: 0 },
  { id: 70, question: "What is a common cause of communication between casing strings during a workover or completion operation?", options: ["Good cement behind the casing strings", "Improper installation or damage to casing or packers", "Adequate well control procedures", "Verification of well integrity"], correctAnswer: 1 },
  { id: 71, question: "In a slickline operation, what is the first step to take when the stuffing box is leaking?", options: ["Increase pressure on stuffing box", "Stop wire movement", "Cut the wire", "Kill the well"], correctAnswer: 0 },
  { id: 72, question: "Running coiled tubing while pumping at high pressures _______ the number of bend cycles before the coiled tubing reaches failure.", options: ["Increases", "Decreases", "Does not affect"], correctAnswer: 1 },
  { id: 73, question: "Shear seal rams used with slickline can always shear the tool string stem/weight bar.", options: ["True", "False"], correctAnswer: 1 },
  { id: 74, question: "Which of the following can NOT be sheared by a wireline shear ram?", options: ["Slick line", "Braided line", "Tool string", "E-line"], correctAnswer: 2 },
  { id: 75, question: "Which of the following can be used as a pressure control device in snubbing operations?", options: ["Slip ram", "Mud gas separator", "Lower master valve", "Upper and lower stripper rams"], correctAnswer: 3 },
  { id: 76, question: "Which of the following is NOT a potential cause of equipment failure during a well control operation?", options: ["Improper maintenance plan", "Formation pressure", "Human error", "All of the above"], correctAnswer: 3 },
  { id: 77, question: "What well control risk could occur during slickline if improper ram alignment occurred?", options: ["Tool string could get stuck across tree", "Blow-by will occur and pressure will be against the stuffing box", "Grease injector head will not be able to contain well pressure", "None of the above"], correctAnswer: 1 },
  { id: 78, question: "Which of the following can be used as an internal pressure control device in snubbing operations?", options: ["Trip tank", "Back pressure valve", "Upper and lower stripper rams", "Safety ram"], correctAnswer: 1 },
  { id: 79, question: "A _______ provides pressure containment and requires constant monitoring and operational support.", options: ["Barrier", "Barrier envelope", "Pressure control device", "Pressure control envelope"], correctAnswer: 2 },
  { id: 80, question: "Which of the following scenario(s) would be considered as a wireline well control drill?", options: ["Tool string stuck across tree", "Leak through stuffing box", "Stranded cable (birdnest)", "All the above"], correctAnswer: 3 },
  { id: 81, question: "When there is a potential of hydrates forming in the well, what is a potential well control risk?", options: ["Creates blockage preventing pumping into the well", "Trapped pressure below hydrate giving incorrect surface pressure reading", "Hydrates only form at high temperature, low pressures", "Both A and B"], correctAnswer: 3 },
  { id: 82, question: "Which criteria are used as part of the selection of barrier elements?", options: ["Lifting/snubbing unit capacity", "Maximum Allowable Annular Surface Pressure (MAASP)", "Number of crew members", "Pressure rating"], correctAnswer: 3 },
  { id: 83, question: "What is a common cause of surface leaks during a well control operation?", options: ["Wear and tear on downhole equipment", "Improper installation of BOP stacks", "Sufficient fluid weight in the wellbore", "All the above"], correctAnswer: 1 },
  { id: 84, question: "The Rated Working Pressure is less than the Maximum Allowable Working Pressure due to the designed safety factors.", options: ["True", "False"], correctAnswer: 1 },
  { id: 85, question: "What problem(s) could occur while perforating an extremely underbalanced well in wireline operations?", options: ["Introduce formation solids and potentially sticking tools", "Tools blown up the hole", "Decreased production", "Both A and B"], correctAnswer: 3 }
];

export const iadcOgorMockTest3Questions: Question[] = [
  { id: 1, question: "Under what two conditions would adjusting the annular regulator pressure be considered?", options: ["While recovering casing from a well and Running fishing tools across stack", "Stripping Operations", "While recovering production liner from a well and stripping a tapered string", "Regulator pressure is never adjusted"], correctAnswer: 2 },
  { id: 2, question: "What can affect the collapse pressure rating of coiled tubing?", options: ["Corrosion/Erosion", "External Pressure Conditions", "Axial Loads and Combined Stress", "All the above"], correctAnswer: 3 },
  { id: 3, question: "What can affect the burst pressure rating of coiled tubing?", options: ["Pipe cycle fatigue", "Wall thickness (corrosion/erosion)", "Pipe Metallurgy", "All the above"], correctAnswer: 3 },
  { id: 4, question: "On a snubbing operation, the primary barrier has failed and needs to be replaced. The upper and lower safety rams have been closed. Which of the following is an acceptable method to check if the BOP rams are sealing?", options: ["After bleeding off the pressure above the BOP's and safe to do so, perform a visual check above the ram BOP'S", "After bleeding off the pressure above the upper safety ram, observe for pressure build-up and/or flow.", "Observe pressure build-up between safety ram and blind ram"], correctAnswer: 1 },
  { id: 5, question: "How is a barrier pressure test accomplished?", options: ["Increase pump pressure above Maximum Anticipated Surface Pressure (MASP)", "Increase a differential pressure across the barrier", "Decrease amount of fluid below the barrier and look for leaks", "Decrease accumulator pressure until leakage occurs"], correctAnswer: 1 },
  { id: 6, question: "With the well shut-in, what indicates that the well is secured?", options: ["Installed safety valve", "No visible leaks", "All the above"], correctAnswer: 1 },
  { id: 7, question: "What is/are the minimum coiled tubing condition(s) that the supervisor is responsible for verifying?", options: ["Manufacturer's Metallurgical Test Records", "Historical Fatigue Tracking or Lifecycle Analytics", "Verify well control response plan with coiled tubing operator", "All the above"], correctAnswer: 2 },
  { id: 8, question: "What grease injection pressure is required to maintain a pressure seal on a well with 3,200 psi MASP?", options: ["Lower than 3,200 psi", "Higher than 3,200 psi", "Equal to 3,200 psi"], correctAnswer: 1 },
  { id: 9, question: "With the well shut-in, what Indicates that the well is secured?", options: ["No observable flow at surface", "Installed safety valve", "All the above"], correctAnswer: 0 },
  { id: 10, question: "What is a limitation of testing the check valve in the BHA?", options: ["Restricts reverse circulation", "Flow limitations", "The ability to only test one flapper"], correctAnswer: 2 },
  { id: 11, question: "What following well has the same snubbing force as running a 7-inch OD pipe against 1,500 psi surface pressure?", options: ["2-3/8\" OD tubing with 9,773 psi surface pressure", "2-3/8\" OD tubing with 13,031 psi surface pressure", "2-3/8\" OD tubing with 6,430 psi surface pressure", "2-3/8\" OD tubing with 2,315 psi surface pressure"], correctAnswer: 1 },
  { id: 12, question: "The MAOP may be equal to or greater than the MASP but less than or equal to ………..", options: ["MAASP", "MAWP"], correctAnswer: 1 },
  { id: 13, question: "Which of the following Is used to prevent the flow of gas between the wire strands of braided cable and E-line?", options: ["Quick test sub", "Tool catcher", "Grease Injector", "All the above"], correctAnswer: 2 },
  { id: 14, question: "What is the purpose of a stripping ram in snubbing operations?", options: ["A dynamic sealing ram that allows movement of pipe into or out of the well sealing on a range of pipe sizes", "A dynamic sealing ram that allows movement of pipe into or out of the well under pressure", "A static sealing ram that allows movement of pipe into or out of the well sealing on a range of pipe sizes"], correctAnswer: 1 },
  { id: 15, question: "In a workover operation, is a grease head classified as a barrier or a pressure control device?", options: ["Barrier", "Pressure control device"], correctAnswer: 1 },
  { id: 16, question: "Where is the wireline ram generally NOT located in the pressure control equipment configuration?", options: ["Below the Wireline Shear Seal", "Below the pump-in-sub", "Above the quick test sub"], correctAnswer: 0 },
  { id: 17, question: "Identify the location of choke line and kill line on a snubbing well control stack", options: ["Location A", "Location B", "Location C", "Location D"], correctAnswer: 1, image: snubbingStackQ17 },
  { id: 18, question: "What can be pumped to minimize fluid loss in completions?", options: ["Zinc bromide", "High viscous pill", "Cesium Format"], correctAnswer: 1 },
  { id: 19, question: "When utilizing old wire in new flow tubes, the risk of stuck wire in flow tube is increased.", options: ["False", "True"], correctAnswer: 1 },
  { id: 20, question: "What could be Included as an external pressure control device?", options: ["Stab-in/safety valve", "Shear-blind rams", "Back pressure valve"], correctAnswer: 1 },
  { id: 21, question: "With the tree installed, and after shearing wire with a wireline shear ram, the well may be secured using the following method:", options: ["Kill well with kill weight fluid", "Close wireline valve", "Close Tree Valves", "B or C"], correctAnswer: 2 },
  { id: 22, question: "Which of the following is an equipment requirement when high H2S is present?", options: ["No limitations", "Only stainless steel can be used", "Steel components that resist sulfide stress cracking"], correctAnswer: 2 },
  { id: 23, question: "What would be a method to remove paraffin or asphaltenes before a workover operation?", options: ["Reverse circulation pumping heavy kill weight fluid", "Conventional (forward) circulation pumping heavy kill weight fluid", "Bullheading a treatment fluid"], correctAnswer: 2 },
  { id: 24, question: "In a reverse circulation event, pumping through a sliding sleeve, what occurs to frictional pressure as the fluid enters the tubing?", options: ["Decreases", "Increases", "Stay same"], correctAnswer: 1 },
  { id: 25, question: "When is a guide ram used during a snubbing operation?", options: ["When closing and locking the safety rams", "When additional support is required within the BOP stack to prevent buckling", "When running a long BHA", "When replacing the stripping element"], correctAnswer: 1 },
  { id: 26, question: "Why are visual inspections regularly performed on pressure control equipment?", options: ["Visual inspections can take the place of pressure tests", "Visual inspections are more efficient than function tests", "To verify there are no leaks", "Both B and C"], correctAnswer: 2 },
  { id: 27, question: "While pressure testing the annulus packer in the hole, without fluid in tubing, what could be a potential failure?", options: ["Tubing could collapse", "Tubing could burst", "Tubing could buckle", "All the above"], correctAnswer: 0 },
  { id: 28, question: "While running in the hole with coiled tubing, the stripper and check valve are operating normally. What function does the Quad Well Control Stack serve in this condition?", options: ["Pressure Control Device", "Barrier"], correctAnswer: 1 },
  { id: 29, question: "What could be Included as an external pressure control device?", options: ["Stab-in/safety valve", "Stripper ram", "Back pressure valve"], correctAnswer: 1 },
  { id: 30, question: "Calculate total barrels required to fill tubing, using the following information:\n• Pump output= 3 bbls/min\n• Tubing length = 12,000' MD/6,775' TVD\n• Tubing OD= 5 ½\" tubing\n• Tubing ID=4.67\" with 4.545\" drift", options: ["352.6 bbls", "143.5 bbls", "254.2 bbls"], correctAnswer: 2 },
  { id: 31, question: "What is a requirement for a component to be considered a barrier?", options: ["Component is pressure tested and verified", "Mechanical closed barrier: must be leak-tight", "Hydrostatic pressure is slightly more or equal formation pressure", "Combination of all the above"], correctAnswer: 3 },
  { id: 32, question: "When conventional (forward) circulating which frictional values) affect bottomhole pressure?", options: ["Friction from the tubing", "Friction from the annulus", "Friction from the surface line"], correctAnswer: 1 },
  { id: 33, question: "Which items have the largest impact on coiled tubing injector gripping forces above the stripper?", options: ["Reel tension, pipe weight, tubing OD, and wellbore pressures", "Wellbore pressures, rig-up height, and length of string", "Pipe weight, tubing OD, buoyancy, and wellbore pressures", "Stripper pressure, length of string, and buoyancy"], correctAnswer: 2 },
  { id: 34, question: "Calculate the surface brine weight to workover this well\n• Formation pressure at the perforations: 3,820 psi at 7,700'\n• Bottomhole Temperature: 290F\n• Surface Temperature: 70F", options: ["9.6 ppg", "9.9 ppg", "10.2 ppg"], correctAnswer: 1 },
  { id: 35, question: "When rigging up on a well that requires a Wireline Shear Seal where would it be located in the pressure control equipment configuration?", options: ["Above the pump-ln-sub", "Below the pump-in sub", "Below the wireline valve", "A and C"], correctAnswer: 3 },
  { id: 36, question: "If a dual stripper is utilized in a coiled tubing operation, gripper block force can be reduced.", options: ["True", "False"], correctAnswer: 1 },
  { id: 37, question: "How is a mechanical barrier element verified?", options: ["Verified through visual inspection", "Verified by increasing pressure differential across the barriers", "Based on Maximum Allowable Annulus Surface Pressure (MAASP)"], correctAnswer: 1 },
  { id: 38, question: "Utilizing gripper block force, a hydraulic style single gripper block size can be used on multiple sized coiled tubing.", options: ["True", "False"], correctAnswer: 1 },
  { id: 39, question: "Variable bore rams are capable of supporting more hanging string weight than a fixed pipe ram.", options: ["True", "False"], correctAnswer: 1 },
  { id: 40, question: "What is the purpose of the guide tube used on snubbing units?", options: ["It is used to guide the tubing up to the workbasket", "It prevents pipe buckling at surface", "To seal on the pipe", "To prevent well control problems"], correctAnswer: 1 },
  { id: 41, question: "Potential risks of having a lubricator or spool between the coiled tubing Well Control Stack and the stripper include:", options: ["Potential risk of working at heights", "Leak Path Exposure", "Reduced Visual and Physical Access", "All the above"], correctAnswer: 3 },
  { id: 42, question: "The Volumetric Method is a:", options: ["Method where kill fluid is displaced in the well at the same time as the influx is removed.", "Method to control bottom hole pressure and allowing influx to expand without causing damage to the well", "Method that involves repeatedly pumping in small quantities of kill fluid into the wellbore and then bleeding off excess pressure"], correctAnswer: 1 },
  { id: 43, question: "The grease Injection head has lost seal on the braided Iine during an operation. The crew has determined that the grease pump has failed, What action should the crew perform to regain the seal on the wire?", options: ["Stop cable, increase hydraulic pressure on the pack-off, and pull wire out of well", "Stop cable, increase pressure on the pack-off. switch to redundant grease pump and continue operations", "Stop cable, Increase pressure on the pack-off, switch to redundant grease pump and pull out of the well", "Stop cable, increase hydraulic pressure on line wiper and pull wire out of well"], correctAnswer: 2 },
  { id: 44, question: "A procedural barrier is used in conjunction with mechanical barriers to assist in the control monitoring of the well.", options: ["Column of fluid with verified height and density", "Physical element", "Set of policies and procedures"], correctAnswer: 2 },
  { id: 45, question: "What additive can be included in workover fluids to limit fluid loss?", options: ["Zinc", "Calcium carbonate", "Cesium format"], correctAnswer: 1 },
  { id: 46, question: "The workstring was pulled out of the well and the blind rams were closed for equipment repair. An hour later, the casing gauge reads 450 psi. If the pressure is bled-off and the kick is migrating, what will happen to the new stabilized casing pressure?", options: ["Be lower than 450 psi", "Be higher than 450 psi", "Saty the same"], correctAnswer: 1 },
  { id: 47, question: "A blind ram will seal on a 0.125\" slickline wire.", options: ["False", "True"], correctAnswer: 1 },
  { id: 48, question: "During snubbing operations, which actions would be taken in the event of stripping ram element fail?", options: ["Secure pipe from movement, replace annular element, and install FOSV in the workstring", "Secure pipe from movement, increase fluid weight, and install stab-in safety valve", "Secure pipe from movement, seal annulus by closing and locking safety rams, and install FOSS the workstring", "Secure pipe from movement, seal annulus by closing pipe rams, and install stab-in safety valve"], correctAnswer: 2 },
  { id: 49, question: "With a flow check assembly removed; an additional shear-blind ram is not required for coiled tubing operations.", options: ["True", "False"], correctAnswer: 1 },
  { id: 50, question: "What is the function of the braided line rams in the wireline BOP?", options: ["Provides a means to isolate the well from the pressure control equipment", "Provides a positive seal around a stationary wire.", "Provides a means to cut the wire.", "Provides a means to equalize the tubing and lubricator"], correctAnswer: 1 },
  { id: 51, question: "What brine weight (with no safety factor) should be mixed on surface to bullhead the well given the following information?\n• Fluid Density in Tubing: 6.2 ppg - SITP: 1,146 psi\n• TVD: 5,800'\n• Average Wellbore Temp (AWBT): 250F\n• Surface Mixing Temperature: 75 F", options: ["9.5 ppg", "9.7 ppg", "10.0 ppg", "10.5 ppg"], correctAnswer: 3, image: brineWeightTableQ51MT1 },
  { id: 52, question: "In wireline operations, what is the function of a quick test sub?", options: ["It allows pressure testing integrity of the connection, including the entire lubricator assembly", "It allows pressure testing integrity of the connection without testing the entire lubricator assembly", "Used to perform initial pressure test", "It keeps the pressure from going too high on the lubricator"], correctAnswer: 1 },
  { id: 53, question: "Calculate the pressure differential at the sliding sleeve given the following:\n• Sliding Sleeve: 8,700' TVD/9,000\" MD\n• Packer: 8,800\" TVD/9,100 MD\n• Top Perforations: 10,000 TVD/10,400\" MD\n• 10.4 ppg in the Tubing\n• 0.444 psi/ft in the Casing", options: ["968 psi", "842 psi", "650 psi", "720 psi"], correctAnswer: 1 },
  { id: 54, question: "During a workover on a gas-producing well, a tubing-conveyed perforating gun was run into the well. By error, the perforations were too deep and total losses were experienced, what is a well control consideration?", options: ["A reduction in hydrostatic pressure could cause an influx of gas.", "There is no well control consideration", "Pull tubing-conveyed perforation quickly", "Both B and C"], correctAnswer: 0 },
  { id: 55, question: "A high temperature well is put on production for the very first time. What is the Importance of closely monitoring the annulus pressure?", options: ["The tubing may burst if subjected to high reservoir temperatures", "The tubing may buckle if subjected to high reservoir pressures", "The annulus pressure may rise above expected values."], correctAnswer: 2 },
  { id: 56, question: "For a bullhead operation, which completion component limits the maximum pump pressure?", options: ["Highest pressure rated component", "Lowest pressure rated component", "Packer"], correctAnswer: 1 },
  { id: 57, question: "In a completion/workover operation, the well barrier that prevents flow and is closest to the source of pressure, Is the ………….", options: ["Secondary Barrier", "Primary Barrie"], correctAnswer: 1 },
  { id: 58, question: "Which of the following Is a crucial factor in determining the appropriate well control strategy?", options: ["Reservoir pressure", "Surface Equipment and Crew Competency", "Barrier Integrity and Redundancy", "All the above"], correctAnswer: 3 },
  { id: 59, question: "A casing pressure test is performed post-completion to verify ………", options: ["Wellbore drift", "Wellbore integrity (MAOP)", "Formation Strength or Fracture Gradient"], correctAnswer: 1 },
  { id: 60, question: "What information should be pre-recorded and available at the job site for a well intervention or completion operation?", options: ["Tubing/casing diameters/capacities, depths of tubulars/perforations, date the well was drilled, and past volumes of fluid added to the well", "Tubing/casing diameters/capacities, depths of tubulars/perforations, the drilling rig name and nationality", "Tubing/casing diameters/capacities, depths of tubulars/perforations, kill fluid density, and fluid volumes required"], correctAnswer: 2 },
  { id: 61, question: "What contributes to upward forces in a snubbing operation?", options: ["Burst pressure of the tubing", "Tubing weight", "Well pressure"], correctAnswer: 2 },
  { id: 62, question: "In a well with 4.5\" OD/3.826\" ID casing and 2.875\" OD/2.441\" ID tubing, which circulation method would create the lowest bottomhole pressure?", options: ["Conventional (Forward) Circulation", "Reverse Circulation"], correctAnswer: 1 },
  { id: 63, question: "Calculate the equivalent circulating density while performing a conventional (forward) circulation with the following Information\n• 8.8 ppg fluid in the well\n• 10,000' TVD/14,000' MD\n• Annular Pressure Loss: 312 psi\n• Tubing Pressure Loss: 1,688 psi\n• Pump Pressure: 2,000 psi", options: ["12.1 ppg", "9.4 ppg", "9 ppg", "10.5 ppg"], correctAnswer: 1 },
  { id: 64, question: "Calculate the annular volume for 8,500' of 2 7/8\" tubing with 2.441\" ID and 2.347\" drift. Casing is 7\", 26 ppf, 6.276\" ID.", options: ["336.4 bbls", "420.7 bbls", "257.0 bbls", "210.2 bbls"], correctAnswer: 2 },
  { id: 65, question: "After a snubbing operation in an H2S well with pressure, it is best practice to change all sealing elements, even if not used.", options: ["False", "True"], correctAnswer: 1 },
  { id: 66, question: "What is an indicator of a failed negative/inflow pressure test?", options: ["Decreasing formation pressure", "Decreasing surface pressure", "Gain of fluid", "All the above"], correctAnswer: 2 },
  { id: 67, question: "Calculate the total volume in barrels of a 12'L x 8'W x 6'H tank.", options: ["102.6 bbls", "104.8 bbls", "97.5 bbls", "132.4 bbls"], correctAnswer: 0 },
  { id: 68, question: "What contributes to downward forces in a snubbing operation?", options: ["Burst pressure of the tubing", "Tubing weight", "Height of fluid inside tubing"], correctAnswer: 2 },
  { id: 69, question: "When deciding on sealing elements potential fluids encountered in the wellbore should not be considered.", options: ["True", "False"], correctAnswer: 1 },
  { id: 70, question: "Which factor is MAOP based upon?", options: ["MAASP", "Test pressure of the equipment", "MASP", "All the above"], correctAnswer: 1 },
  { id: 71, question: "Highest calculated pressure that a given equipment will be subjected to during the execution of the prescribed service and/or during a contingency operation is defined as ……………", options: ["Maximum Anticipated Surface Pressure (MASP)", "Maximum Allowable Operating Pressure (MAOP)"], correctAnswer: 1 },
  { id: 72, question: "What is the definition of lube & bleed?", options: ["Pumping kill fluid direct to perforations", "Pumping small amount of kill fluid and waiting", "Reducing influx by increasing hydrostatics by removing gas by bleeding", "Managing gas to reach surface for keeping BHP constant"], correctAnswer: 2 },
  { id: 73, question: "Which of the following can be used as a pressure control device in snubbing operations?", options: ["Fluid pump", "Annular BOP", "Trip tank", "Mud gas separator"], correctAnswer: 1 },
  { id: 74, question: "While near surface, there is a slight leak in the coiled tubing between the tubing guide arch and the reel. Which of the following actions can be taken?", options: ["Continue out of the hole", "Run coiled tubing leak in below stripper and pipe rams and assess the situation"], correctAnswer: 1 },
  { id: 75, question: "What condition causes collapse of coiled tubing string?", options: ["High internal pressure", "High external differential pressure"], correctAnswer: 1 },
  { id: 76, question: "Which of the following is most true concerning ovality of coiled tubing?", options: ["Ovallty issues are very rare with coiled tubing because there are no connections in the string", "Can significantly decrease collapse pressure rating"], correctAnswer: 1 },
  { id: 77, question: "When on or off bottom, what is the best action to be taken when there is buckled coiled tubing between injector and stripper assembly?", options: ["Pump down coiled tubing", "Check for flow and leaks"], correctAnswer: 1 }
];

export function getQuestionsByCategory(category: string): Question[] {
  switch (category) {
    case "workover":
      return workoverQuestions;
    case "coiled-tubing":
      return coiledTubingQuestions;
    case "wireline":
      return wirelineQuestions;
    case "snubbing":
      return snubbingQuestions;
    case "iadc-ogor-mock-test-1":
      return iadcOgorMockTest1Questions;
    case "iadc-ogor-mock-test-2":
      return iadcOgorMockTest2Questions;
    case "iadc-ogor-mock-test-3":
      return iadcOgorMockTest3Questions;
    case "iwcf-drilling":
      return iwcfDrillingQuestions as Question[];
    default:
      return [];
  }
}
