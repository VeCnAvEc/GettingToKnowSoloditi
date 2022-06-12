// const { expect } = require("chai")
// const { ethers } = require("hardhat")

// describe("AucEnjine", () => {
//     let owner;
//     let seller;
//     let buyer;
//     let auct;

//     beforeEach(async function() {
//         [owner, seller, buyer] = await ethers.getSigners()

//         const AucEnjine = await ethers.getContractFactory("AucEnjine", owner)
//         auct = await AucEnjine.deploy()
//         await auct.deployed()
//     })

//     it("sets owner", async function() {
//         const currentOwner = await auct.owner()
//         console.log(currentOwner);
//         console.log("utils: ", ethers.utils.parseEther("0.00000000000001"));
//         expect(currentOwner).to.eq(owner.address)
//     })

//     async function getTimestamp(bn) {
//         return (
//             await ethers.provider.getBlock(bn)
//         ).timestamp
//     }

//     describe("createAuction", () => {
//         it("creates auction correctly", async function() {
//             const duraction = 60
//             const tx = await auct.createAuction(
//                 ethers.utils.parseEther("0.0001"),
//                 3,
//                 "fake item",
//                 duraction
//             )
            
//             const cAuction = await auct.auctions(0);
//             expect(cAuction.item).to.eq("fake item")
//             console.log(tx);
//             const ts = await getTimestamp(tx.blockNumber)
//             expect(cAuction.endsAt).to.eq(ts + duraction)
//         })
//     })

//     function delay(ms) {
//         return new Promise(resolve => setTimeout(resolve, ms))
//     }

//     describe("buy", () => {
//         it("allows to buy", async() => {
//             await auct.connect(seller).createAuction(
//                 ethers.utils.parseEther("0.0001"),
//                 3,
//                 "fake item",
//                 60
//             )
            
//             // this.timeout(5000)
//             await delay(1000)

//             const buyTx = await auct.connect(buyer).
//               buy(0, {value: ethers.utils.parseEther("0.0001")})
            
//             const cAuction = await auct.auctions(0);
//             const finalPrice = cAuction.finalPrice

//             await expect(() => buyTx).to.changeEtherBalance(
//                   seller, finalPrice - Math.floor(((finalPrice * 10) / 100))
//             )

//             await expect(buyTx)
//                 .to.emit(auct, "AuctionEnded")
//                 .withArgs(0, finalPrice, buyer.address);

//             await expect(
//                 auct.connect(buyer).
//                     buy(0, {value: ethers.utils.parseEther("0.0001")})
//             ).to.be.revertedWith("Stoped");
//         })
//     })
// })