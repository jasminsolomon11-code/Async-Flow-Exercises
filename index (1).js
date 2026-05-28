// ==========================================
// Step 1: Synchronous Execution
// ==========================================

console.log("=== Step 1: Synchronous Execution ===");

console.log("A");
console.log("B");
console.log("C");


// ==========================================
// Step 2: setTimeout (Macrotask)
// ==========================================

console.log("\n=== Step 2: setTimeout Example ===");

console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

console.log("End");


// ==========================================
// Step 3: Promise (Microtask)
// ==========================================

console.log("\n=== Step 3: Promise Example ===");

console.log("Start");

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");


// ==========================================
// Step 4: Microtask vs Macrotask
// ==========================================

console.log("\n=== Step 4: Microtask vs Macrotask ===");

console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");


// ==========================================
// Step 5: Async/Await
// ==========================================

console.log("\n=== Step 5: Async/Await ===");

async function test() {
  console.log("1");

  await Promise.resolve();

  console.log("2");
}

console.log("3");

test();

console.log("4");


// ==========================================
// Step 6: Advanced Flow Challenge
// ==========================================

console.log("\n=== Step 6: Advanced Flow Challenge ===");

console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

console.log("D");