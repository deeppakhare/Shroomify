import React from 'react';
import { SUBSCRIPTION_PLANS } from '../constants';
import { ChevronDown, MapPin, Mail, Phone } from 'lucide-react';

export const About: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-stone-900 mb-4">Our Story</h1>
        <p className="text-lg text-gray-500">From a small garage in Pune to your kitchen table.</p>
    </div>
    
    <div className="prose prose-lg text-gray-600 mx-auto">
        <p className="mb-6">
            Founded in 2024, Shroomify started when our founder realized the lack of truly fresh, chemical-free mushrooms in the local market. 
            Most mushrooms travel hundreds of kilometers before reaching the shelf, losing flavor and nutrition.
        </p>
        <img src="https://images.unsplash.com/photo-1626202377852-c6cb9269550c?auto=format&fit=crop&q=80&w=800" alt="Our Farm" className="w-full rounded-xl shadow-lg my-8" />
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Farming Method</h3>
        <p className="mb-6">
            We use a <strong>Vertical Farming</strong> approach in climate-controlled growing rooms. 
            Our substrate consists of sterilized agricultural waste—wheat straw and cotton waste—which we upcycle.
            This method is not only sustainable but ensures zero contact with soil-borne pathogens, eliminating the need for pesticides.
        </p>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Certifications</h3>
        <ul className="list-disc pl-5 space-y-2 mb-8">
            <li><strong>FSSAI Registered:</strong> License No. 1234567890</li>
            <li><strong>Organic Certified:</strong> NPOP India</li>
            <li><strong>Zero Waste:</strong> Spent mushroom substrate is composted for local farmers.</li>
        </ul>
    </div>
  </div>
);

export const Contact: React.FC = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Get in Touch</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white shadow-lg rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Info</h3>
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="bg-green-100 p-3 rounded-full text-green-600"><Mail size={20}/></div>
                        <div>
                            <p className="font-medium text-gray-900">Email</p>
                            <p className="text-gray-500">hello@shroomify.in</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                         <div className="bg-green-100 p-3 rounded-full text-green-600"><Phone size={20}/></div>
                        <div>
                            <p className="font-medium text-gray-900">Phone</p>
                            <p className="text-gray-500">+91 98765 43210</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                         <div className="bg-green-100 p-3 rounded-full text-green-600"><MapPin size={20}/></div>
                        <div>
                            <p className="font-medium text-gray-900">Farm Address</p>
                            <p className="text-gray-500">Plot 42, Agro Park, Hinjewadi Phase 3, Pune, MH.</p>
                        </div>
                    </div>
                </div>
            </div>
            
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.365319803517!2d73.725!3d18.575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM0JzMwLjAiTiA3M8KwNDMnMzAuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                className="w-full h-full rounded-xl shadow-lg min-h-[300px]" 
                loading="lazy"
            ></iframe>
        </div>

        {/* FAQs */}
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {[
                    {q: "How long do fresh oyster mushrooms last?", a: "When refrigerated in a paper bag, they stay fresh for 5-7 days."},
                    {q: "Do you deliver on Sundays?", a: "Yes, we harvest and deliver 7 days a week."},
                    {q: "Is it safe to eat raw?", a: "We recommend cooking oyster mushrooms to unlock their full nutritional value and flavor."},
                    {q: "Do you offer refunds?", a: "Yes, if the quality is compromised upon delivery, send us a photo within 2 hours for a full refund."}
                ].map((faq, idx) => (
                    <details key={idx} className="bg-white border rounded-lg p-4 cursor-pointer group">
                        <summary className="flex justify-between items-center font-medium text-gray-900">
                            {faq.q}
                            <ChevronDown className="group-open:rotate-180 transition-transform"/>
                        </summary>
                        <p className="mt-2 text-gray-600 text-sm">{faq.a}</p>
                    </details>
                ))}
            </div>
        </div>
    </div>
);

export const Subscription: React.FC = () => (
    <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">Mushroom Subscriptions</h1>
        <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">Never run out of mushrooms. Fresh harvest delivered to your door automatically.</p>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-8 max-w-4xl mx-auto">
            {SUBSCRIPTION_PLANS.map(plan => (
                <div key={plan.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex flex-col hover:border-green-500 transition">
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
                    <p className="mt-8">
                        <span className="text-4xl font-extrabold text-gray-900">₹{plan.price}</span>
                        <span className="text-base font-medium text-gray-500">/{plan.frequency.toLowerCase()}</span>
                    </p>
                    <button className="mt-8 block w-full bg-green-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-green-700">
                        Subscribe Now
                    </button>
                </div>
            ))}
        </div>
    </div>
);

export const BulkInquiry: React.FC = () => (
    <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bulk / B2B Inquiry</h1>
        <p className="text-gray-600 mb-8">Restaurants, Hotels, and Retailers - Partner with us for wholesale pricing. GST Invoices available.</p>
        
        <form className="bg-white shadow sm:rounded-lg p-8 space-y-6">
             <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Business Name</label>
                    <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">GSTIN (Optional)</label>
                    <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
             </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Estimated Monthly Requirement (kg)</label>
                <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-stone-800 hover:bg-stone-900">
                Send Inquiry
            </button>
        </form>
    </div>
);

export const Legal: React.FC = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Legal & Policies</h1>
        
        <div className="space-y-8">
            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">Privacy Policy</h2>
                <p className="text-gray-600 text-sm">
                    We collect basic information (Name, Address, Phone) solely for delivery purposes. 
                    We do not share your data with third parties except our delivery partners. 
                    Payments are processed securely via encrypted gateways.
                </p>
            </section>
            
            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">Terms & Conditions</h2>
                <p className="text-gray-600 text-sm">
                    By placing an order, you agree to receive fresh produce. 
                    Prices are subject to change based on seasonal availability.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">Refund & Return Policy</h2>
                <p className="text-gray-600 text-sm">
                    <strong>Fresh Produce:</strong> Due to the perishable nature of mushrooms, we do not accept returns. 
                    However, if items are damaged during transit, please share a photo within 2 hours of delivery for a replacement or refund.
                    <br/><br/>
                    <strong>Dry Goods/Kits:</strong> Returns accepted within 7 days if packaging is unopened.
                </p>
            </section>
        </div>
    </div>
);
